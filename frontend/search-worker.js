self.onmessage=({data})=>{
  const query=data.query.toLocaleLowerCase(),results=[];
  for(const row of data.rows){const i=row.text.toLocaleLowerCase().indexOf(query);if(i<0)continue;results.push({...row,text:undefined,before:row.text.slice(Math.max(0,i-55),i),match:row.text.slice(i,i+query.length),after:row.text.slice(i+query.length,i+query.length+100)});if(results.length>=50)break}
  self.postMessage({token:data.token,results});
};
