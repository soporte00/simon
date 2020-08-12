const simon = document.getElementById('simon')
const mssg = document.getElementById('mssg')
const play = document.getElementById('play')

let duration = 1;
let simonSay = []
let userSay = []
let mode = 0

let rand = ()=> {return Math.floor(Math.random() * 4) + 1;}

const light = (part)=>{
 	part = document.getElementById(part)
 
 	return new Promise((resolve)=>{

		setTimeout( ()=>{
			part.classList.toggle('brightness')

			setTimeout(()=>{
				part.classList.toggle('brightness')
				return resolve();
			},(800 * duration))

		},(800 * duration))
 	})
}


const showLights = async ()=>{
	for(const part of simonSay){ await light(`part-${part}`); }
	mode = 2
	mssg.textContent = '¡¡Ahora es tu turno!!'
}


const nextStage = ()=>{
	
	
	if(mode == 0){
		mode = 1
		simonSay.push(rand())
		simonSay.push(rand())
		showLights()
		return
	}

	simonSay.push(rand())
	showLights()
}



simon.addEventListener("click",(e)=>{

	if(e.target.tagName != 'BUTTON' || mode !== 2) return

	if(e.target.id === 'part-1') userSay.push(1)
	else if(e.target.id === 'part-2') userSay.push(2)
	else if(e.target.id === 'part-3') userSay.push(3)
	else if(e.target.id === 'part-4') userSay.push(4)


	const last = (userSay.length - 1)
	if(simonSay[last] != userSay[last]){
		mssg.textContent = 'Perdiste'
		mode = 0
		userSay = []
		simonSay = []
		duration = 1
		simon.classList.toggle('rotate')
		play.classList.remove('undisplay')
		return
	}


	if(userSay.length == simonSay.length){
		duration = 1 - (simonSay.length / 40) 
		mode = 1
		mssg.textContent = '...'
		userSay = []
		nextStage()
	}


})

play.addEventListener("click",()=>{
	play.classList.add('undisplay')
	mssg.textContent = '...'
	nextStage()
})