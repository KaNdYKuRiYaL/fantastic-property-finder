const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;


// fetch all properties
async function fetchProperties(){
    try{
    //handle case when the domin is not available yet 
      if(!apiDomain){
        return [];
      }
      const res = await fetch(`${apiDomain}/properties`, {cache:'default'})
      if(!res.ok){
        throw new Error('Failed to fetch data')
      }
      const final = await res.json();
      return final;
    }
    catch(error){
      console.log(error);
    }
}


// fetch single property
async function fetchProperty(id){
  try{
  //handle case when the domin is not available yet 
    if(!apiDomain){
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`)
    if(!res.ok){
      throw new Error('Failed to fetch data')
    }
    return await res.json();
  }
  catch(error){
    console.log(error);
    return null;
  }
}

export {fetchProperties , fetchProperty};