function getSessionStorage(id){
	if(typeof(Storage) !== 'undefined'){
	  	if(sessionStorage.getItem(id)){
			return sessionStorage.getItem(id);
		}
		return false;
	} 
	return false;
}

function setSessionStorage(id,data){
	if(typeof(Storage) !== 'undefined'){
		return sessionStorage.setItem(id, data);
	} 
	return false;	
}



function storage(parameter=null){
	if(typeof(Storage) !== 'undefined'){

		const data = JSON.parse( localStorage.getItem('score') ) ;
		
		if(parameter !== null){
			if(localStorage.setItem('score', JSON.stringify(parameter)) == false){
				console.error('No se pudo guardar en localStorage')
				return false
			}
		}

		return data;
	} 

	console.error('el localStorage no se encuentra habilitado')
	return false
}
