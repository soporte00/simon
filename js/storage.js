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

		if(parameter !== null){
			localStorage.setItem('score', JSON.stringify(parameter));
			return
		}


		let data = localStorage.getItem('score');

		if(data !== null){
			return JSON.parse(data);
		}


		return false;
	} 

	console.error('el localStorage no se encuentra habilitado')
	return false
}
