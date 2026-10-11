import io
import json
import re
import streamlit as st
from google import genai
from google.genai import types
from pptx import Presentation
from pptx.util import Inches, Pt
from urllib.parse import quote_plus

st.set_page_config(page_title="LECTRA AI", page_icon="🎓", layout="wide")

st.markdown("""
<style>
.stApp { background: #0b1020; color: #f3f4f6; }
h1, h2, h3 { color: #f3f4f6; }
[data-testid="stMetric"] { background: #151d32; padding: 16px; border-radius: 12px; }
.stButton button { border-radius: 10px; font-weight: 600; }
</style>
""", unsafe_allow_html=True)

MODELS = ["gemini-3.8-flash"]
MAX_BYTES = 10 * 1024 * 1024

DEMO_DATA = {
  "title": "Demo: Photosynthesis Basics (示例)",
  "transcript": "大家好，今天我们讲光合作用。植物利用光能，把水和二氧化碳变成葡萄糖和氧气。(Demo transcript - works without API key)",
  "translation": "Всем привет, сегодня про фотосинтез. Растения используют свет, превращая воду и CO2 в глюкозу и кислород.",
  "summary": "Демо-режим без API-ключа: показывает как будет выглядеть результат. Загрузите аудио + добавьте ключ для настоящего анализа.",
  "notes": ["Фотосинтез: свет + вода + CO2 = глюкоза + кислород", "Происходит в хлоропластах, хлорофилл улавливает свет", "Демо-данные, добавьте GEMINI_API_KEY для реальных лекций"],
  "key_terms": [{"term": "光合作用 / Фотосинтез", "definition": "Процесс превращения света в химическую энергию"}, {"term": "叶绿体 / Хлоропласт", "definition": "Органелла где идёт фотосинтез"}],
  "slides": [{"title": "What is Photosynthesis?", "points": ["Light + water + CO2 → glucose + O2", "Demo slide - real slides come from your audio"]}, {"title": "Where it happens", "points": ["Chloroplasts, chlorophyll captures light", "Demo slide"]}, {"title": "Why it matters", "points": ["Base of food chain, produces oxygen", "Demo slide"]}, {"title": "Key equation", "points": ["6CO2 + 6H2O + light → C6H12O6 + 6O2", "Demo slide"]}],
  "quiz": [{"question": "Демо: что нужно для фотосинтеза?", "options": ["Свет, вода, CO2", "Только кислород", "Только почва", "Темнота"], "answer": 0, "explanation": "Демо-ответ. С настоящим ключом вопросы будут по вашей лекции."}, {"question": "Demo: where does photosynthesis happen?", "options": ["Chloroplast", "Nucleus", "Mitochondria", "Ribosome"], "answer": 0, "explanation": "Demo answer."}, {"question": "Демо: что выделяет растение?", "options": ["Кислород", "Азот", "Водород", "Гелий"], "answer": 0, "explanation": "Демо-ответ."}],
  "further_topics": ["photosynthesis equation", "chloroplast structure"]
}


st.title("🎓 LECTRA AI")
st.subheader("One lecture. Any language. Complete understanding.")
st.write("Turn a foreign-language lecture into notes, slides, explanations and a personalized quiz.")

with st.sidebar:
    st.header("Your learning preferences")
    output_language = st.selectbox("Language of study materials", ["Russian", "English", "Kazakh", "Chinese", "Spanish", "French"])
    lecture_language = st.selectbox("Original lecture language", ["Chinese", "English", "Russian", "Kazakh", "Spanish", "French", "German", "Japanese", "Other / auto-detect"])
    st.caption("MVP: uploaded audio, not live recording.")
    st.caption("Maximum upload size: 10 MB.")

audio = st.file_uploader("Upload a short lecture", type=["mp3", "wav", "m4a", "aac", "ogg", "flac"])

def reset_quiz_answers():
    for key in list(st.session_state):
        if key.startswith("quiz_"):
            del st.session_state[key]


def validate_data(data):
    if not isinstance(data, dict):
        raise ValueError("Expected a JSON object.")
    for key in ("title", "transcript", "translation", "summary"):
        if not isinstance(data.get(key), str) or not data[key].strip():
            raise ValueError(f"Missing or invalid field: {key}")
    for key in ("notes", "further_topics"):
        if not isinstance(data.get(key), list) or not all(isinstance(x, str) for x in data[key]):
            raise ValueError(f"Invalid list: {key}")
    for key in ("key_terms", "slides", "quiz"):
        if not isinstance(data.get(key), list):
            raise ValueError(f"Invalid list: {key}")
    for item in data["key_terms"]:
        if not isinstance(item, dict) or not all(isinstance(item.get(k), str) for k in ("term", "definition")):
            raise ValueError("Invalid key term.")
    if not 4 <= len(data["slides"]) <= 8:
        raise ValueError("Expected 4 to 8 slides.")
    for item in data["slides"]:
        if not isinstance(item, dict) or not isinstance(item.get("title"), str):
            raise ValueError("Invalid slide.")
        points = item.get("points")
        if not isinstance(points, list) or not points or not all(isinstance(x, str) for x in points):
            raise ValueError("Invalid slide points.")
    if not 3 <= len(data["quiz"]) <= 5:
        raise ValueError("Expected 3 to 5 quiz questions.")
    for item in data["quiz"]:
        if not isinstance(item, dict) or not all(isinstance(item.get(k), str) for k in ("question", "explanation")):
            raise ValueError("Invalid quiz question.")
        options = item.get("options")
        if not isinstance(options, list) or len(options) != 4 or not all(isinstance(x, str) and x.strip() for x in options):
            raise ValueError("Expected four nonempty quiz options.")
        if type(item.get("answer")) is not int or not 0 <= item["answer"] < 4:
            raise ValueError("Invalid correct answer.")
    return data


col_demo, col_info = st.columns([1, 2])
with col_demo:
    if st.button("🚀 Try DEMO without key"):
        reset_quiz_answers()
        st.session_state["lecture_data"] = DEMO_DATA
        st.session_state["lecture_name"] = "demo"
        st.success("Demo loaded! No API key needed.")
        st.rerun()
with col_info:
    st.caption("DEMO uses a fixed sample; it does not process your audio or follow language preferences.")

def get_api_key():
    try:
        return st.secrets["GEMINI_API_KEY"]
    except Exception:
        return ""

def parse_json(text):
    text = text.strip()
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        m = re.search(r"\{.*\}", text, re.DOTALL)
        if not m:
            raise
        return json.loads(m.group(0))

def create_presentation(data):
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    slide.shapes.title.text = data.get("title", "Lecture Study Guide")
    slide.placeholders[1].text = "Generated by LECTRA AI"
    for item in data.get("slides", [])[:10]:
        slide = prs.slides.add_slide(prs.slide_layouts[1])
        slide.shapes.title.text = str(item.get("title", "Key concept"))
        body = slide.placeholders[1].text_frame
        body.clear()
        points = item.get("points", []) or ["Review this concept in the lecture notes."]
        for index, point in enumerate(points[:5]):
            paragraph = body.paragraphs[0] if index == 0 else body.add_paragraph()
            paragraph.text = str(point)
            paragraph.font.size = Pt(22)
            paragraph.level = 0
    output = io.BytesIO()
    prs.save(output)
    output.seek(0)
    return output.getvalue()

def analyze_audio(file_bytes, mime_type, language, out_lang, client):
    prompt = f"""You are LECTRA AI, a careful multilingual learning assistant.
Analyze the attached lecture audio.
Original language: {language}
Output language: {language} for the transcript, and {out_lang} for all study materials.
Return ONLY one valid JSON object. No Markdown fences.
Use exactly these keys:
{{"title": "short lecture title","transcript": "transcription in the original spoken language","translation": "faithful translation of the lecture","summary": "clear overview for a student","notes": ["important point 1", "important point 2"],"key_terms": [{{"term": "term", "definition": "simple explanation"}}],"slides": [{{"title": "slide heading", "points": ["point 1", "point 2"]}}],"quiz": [{{"question": "question","options": ["option A", "option B", "option C", "option D"],"answer": 0,"explanation": "why this answer is correct"}}],"further_topics": ["topic to explore 1", "topic to explore 2"]}}
Requirements:
- Create 4 to 8 slides and 3 to 5 quiz questions.
- Each quiz answer must be an integer from 0 to 3.
- Preserve the meaning of the lecture. Do not invent details not supported by the audio.
- If a section is unclear, explicitly say so.
- Explain technical terms simply. Make notes useful for exam preparation.
- Recommend further topics related to this specific lecture.
- Keep the transcript complete when feasible. If shortened, state it is an excerpt.
- Output valid JSON only."""
    audio_part = types.Part.from_bytes(data=file_bytes, mime_type=mime_type)
    last_err = None
    for model in MODELS:
        try:
            response = client.models.generate_content(model=model, contents=[prompt, audio_part], config=types.GenerateContentConfig(response_mime_type="application/json"))
            if not response.text:
                raise ValueError(f"Empty response from {model}")
            return validate_data(parse_json(response.text)), model
        except Exception as e:
            msg = str(e)
            last_err = e
            if "404" in msg or "NOT_FOUND" in msg or "not found" in msg.lower():
                continue
            raise
    raise last_err

mime_types = {"mp3": "audio/mpeg", "wav": "audio/wav", "m4a": "audio/m4a", "aac": "audio/aac", "ogg": "audio/ogg", "flac": "audio/flac"}

if audio:
    st.audio(audio)
    if len(audio.getvalue()) > MAX_BYTES:
        st.error("This demo accepts files up to 10 MB. Please use a shorter recording.")
        st.stop()
    st.caption(f"File: {audio.name} · {len(audio.getvalue()) / 1024:.0f} KB")
    if st.button("✨ Generate Learning Pack", type="primary", use_container_width=True):
        api_key = get_api_key()
        if not api_key:
            st.error("API key not configured. Click 🚀 Try DEMO above, or add GEMINI_API_KEY in Secrets.")
        else:
            extension = audio.name.rsplit(".", 1)[-1].lower()
            mime_type = mime_types.get(extension)
            if not mime_type:
                st.error("Unsupported audio format.")
                st.stop()
            try:
                client = genai.Client(api_key=api_key)
                with st.spinner("Listening, translating and building your study pack..."):
                    data, used_model = analyze_audio(audio.getvalue(), mime_type, lecture_language, output_language, client)
                reset_quiz_answers()
                st.session_state["lecture_data"] = data
                st.session_state["lecture_name"] = audio.name
                st.success(f"Your learning pack is ready! (model: {used_model})")
            except json.JSONDecodeError:
                st.error("The AI returned an unreadable result. Please retry.")
            except Exception as error:
                st.error("Processing failed. Check API key, model access, audio format and quota.")
                st.caption(f"Technical details: {error}")

data = st.session_state.get("lecture_data")
if data:
    st.divider()
    st.header(data.get("title", "Your lecture"))
    tab1, tab2, tab3, tab4, tab5, tab6 = st.tabs(["📝 Transcript", "🌍 Translation", "📚 Smart Notes", "📊 AI Slides", "🧠 Quiz", "🔎 Explore"])
    with tab1:
        st.subheader("Original transcript")
        st.write(data.get("transcript", "No transcript available."))
        st.download_button("Download transcript", data.get("transcript", ""), file_name="lectra_transcript.txt", mime="text/plain")
    with tab2:
        st.subheader("Translated lecture")
        st.write(data.get("translation", "No translation available."))
        st.download_button("Download translation", data.get("translation", ""), file_name="lectra_translation.txt", mime="text/plain")
    with tab3:
        st.subheader("Lecture summary")
        st.write(data.get("summary", ""))
        st.subheader("Key takeaways")
        for note in data.get("notes", []):
            st.markdown(f"- {note}")
        st.subheader("Key terms")
        for term in data.get("key_terms", []):
            with st.expander(str(term.get("term", "Term"))):
                st.write(term.get("definition", ""))
    with tab4:
        st.subheader("Presentation preview")
        for slide in data.get("slides", []):
            with st.container(border=True):
                st.markdown(f"### {slide.get('title', 'Slide')}")
                for point in slide.get("points", []):
                    st.markdown(f"- {point}")
        pptx_bytes = create_presentation(data)
        st.download_button("⬇️ Download PowerPoint", data=pptx_bytes, file_name="lectra_presentation.pptx", mime="application/vnd.openxmlformats-officedocument.presentationml.presentation", type="primary")
    with tab5:
        st.subheader("Test your understanding")
        quiz = data.get("quiz", [])
        if not quiz:
            st.info("No quiz questions were generated.")
        else:
            with st.form("lecture_quiz"):
                answers = []
                for i, question in enumerate(quiz):
                    st.markdown(f"**{i + 1}. {question.get('question', 'Question')}**")
                    options = question.get("options", []) or []
                    options = [str(o) for o in options[:4]]
                    while len(options) < 4:
                        options.append("Option unavailable")
                    choice = st.radio("Choose one answer", range(4), format_func=lambda n, opts=options: opts[n], key=f"quiz_{i}", label_visibility="collapsed")
                    answers.append(choice)
                submitted = st.form_submit_button("Check answers")
            if submitted:
                score = 0
                for i, question in enumerate(quiz):
                    correct = question.get("answer")
                    valid = type(correct) is int and 0 <= correct < len(question.get("options", []))
                    is_correct = valid and answers[i] == correct
                    if is_correct:
                        score += 1
                        st.success(f"Question {i + 1}: Correct!")
                    else:
                        st.error(f"Question {i + 1}: Not quite.")
                    if valid:
                        st.write("Correct answer: " + str(question["options"][correct]))
                    st.caption(question.get("explanation", ""))
                st.metric("Your score", f"{score}/{len(quiz)}")
    with tab6:
        st.subheader("Continue learning")
        st.write("These are suggested search links, not individually verified sources.")
        for topic in data.get("further_topics", []):
            query = quote_plus(str(topic))
            st.markdown(f"- [{topic} — search educational articles](https://scholar.google.com/scholar?q={query})")
            st.markdown(f"  [Find videos on YouTube](https://www.youtube.com/results?search_query={query})")
    st.divider()
    export = {key: data.get(key) for key in ["title", "transcript", "translation", "summary", "notes", "key_terms", "slides", "quiz", "further_topics"]}
    st.download_button("⬇️ Download complete study pack (JSON)", data=json.dumps(export, ensure_ascii=False, indent=2), file_name="lectra_study_pack.json", mime="application/json")
else:
    st.info("Upload a short lecture above to generate your first learning pack.")

with st.expander("🔐 Setup and privacy"):
    st.markdown("""
    1. Create a Gemini API key in Google AI Studio.
    2. Add it to Streamlit Secrets as: `GEMINI_API_KEY = "your-key"`
    3. Never put the key in this file or GitHub.
    4. Audio is sent to the selected AI provider for processing.
    5. Do not upload private lectures without permission.
    """)