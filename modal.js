function modal(){

	return new Promise((resolve)=>{

		const modalContainer = document.createElement("div");
		modalContainer.setAttribute("class", "modalContainer");
		document.body.appendChild(modalContainer);

		modalContainer.innerHTML =`<div id='modal' class='modal'>
				<legend class='modal__legend'>Dime tu nombre antes de jugar ;)</legend>
			<form class='modal__form' id='modalForm'>
				<input class='modal__input' type='text' id='user' placeholder='Ingrese su nombre'>
				<input class='modal__input' type='submit' value='Continuar'>
			</form>
		</div>`;

		return resolve(modalContainer);
	});

}