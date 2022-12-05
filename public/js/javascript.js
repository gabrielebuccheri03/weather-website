const form = document.querySelector('form');
const input = document.querySelector('input');
const output = document.querySelector('p');
async function req(location){
  const response = await fetch(`http://localhost:3000/weather?address=${location}`);
  if(location){
    const resData = await response.json();
    if(resData.error){
      output.textContent = resData.error;
    }
    else{
      output.textContent = `Location : ${resData.location} State : ${resData.state} Weather : ${resData.forecast} `;
    } 
  }
  else{
    output.textContent =  'Location not provided';
  }
}


form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  await req(input.value);
});

