const simon = document.getElementById('simon')
const mssg = document.getElementById('mssg')
const play = document.getElementById('play')
const score = document.getElementById('score')
const points = document.getElementById('points')

let simonSay = []
let userSay = []
let mode = 0

let rand = ()=> {return Math.floor(Math.random() * 4) + 1;}



let timer = 600;

const audio = (hz,time = timer)=>{
	const ctxt = window.AudioContext || window.webkitAudioContext;
	const audioContext = new ctxt()
	const oscillator = audioContext.createOscillator()
	oscillator.frequency.value = hz
	oscillator.connect(audioContext.destination)
	oscillator.start()
	setTimeout(()=>{oscillator.stop()}, time )
}


const light = (number)=>{
 	part = document.getElementById(`part-${number}`)
 
 	return new Promise((resolve)=>{

		setTimeout( ()=>{

			part.classList.toggle('brightness')
		
			audio(number * 170);

			setTimeout(()=>{ 
				part.classList.toggle('brightness')
				return resolve();
			},timer)

		},timer)
 	})
}


const showLights = async ()=>{
	for(const part of simonSay){await light(part); }
	mode = 2
	mssg.textContent = '¡¡Ahora es tu turno!!'
}


const presentation = async ()=>{
	mem = timer
	timer = 80
	mssg.textContent = ' Ponte alerta!!'
	for(const part of [4,2,3,2,1,4]){await light(part); 
	}
	timer = mem
}


const nextStage = ()=>{
	
	if(mode == 0){
		mode = 1
		simonSay.push(rand())
		simonSay.push(rand())
		showLights()
		return
	}

	let point = parseInt((simonSay.length -1) * (600 / timer) + 1)

	setScore(point)

	points.textContent = `${point}`

	simonSay.push(rand())
	showLights()
}


const setScore = (set = null)=>{

	let current = getSessionStorage('current')
	let data = storage()

	if(!current)return

	if(!storage()){
		let myScore = {}
		myScore[current] = 0
		storage(myScore)	
	} 

	if(!data[current]){
		data[current]= 0
		storage(data)	
	} 

	if(set !== null && data[current] < set){ 
		data[current] = set
		storage(data)	
	}

	score.innerHTML = ''
	
	n = 0
	for(let dt in data){
			k = ''
			v = ''
			for(let d in data){
				if(n == 0 ||( v < data[d] && data[d] !== undefined ) ){ v = data[d]; k = d; n++}
			}

			data[k] = undefined

			score.innerHTML += `<span class='score__row'>${k} - ${v}</span>`

	}
}



const checkUser = ()=>{

	if(!getSessionStorage('current')){

		modal()
		.then((modal)=>{

			const modalForm  = document.getElementById('modalForm')

			modalForm.addEventListener('submit',(e)=>{

			e.preventDefault()

				if(e.target.user.value.trim().length > 0){
					setSessionStorage('current', e.target.user.value) 
					modal.remove()
					setScore()
				}

			})



		})


	}

	setScore()

}


const logout = ()=>{
	sessionStorage.removeItem('current');
}



simon.addEventListener("click",(e)=>{

	if(e.target.tagName != 'BUTTON' || mode !== 2) return

	if(e.target.id === 'part-1'){userSay.push(1); audio(170,300)}
	else if(e.target.id === 'part-2'){userSay.push(2); audio(340,300)}
	else if(e.target.id === 'part-3'){userSay.push(3); audio(510,300)}
	else if(e.target.id === 'part-4'){userSay.push(4); audio(680,300)}


	const last = (userSay.length - 1)
	if(simonSay[last] != userSay[last]){
		mssg.textContent = 'Perdiste'
		audio(500,400)
		audio(300,400)
		mode = 0
		userSay = []
		simonSay = []
		timer = 600
		simon.classList.toggle('rotate')
		play.classList.remove('undisplay')
		return
	}


	if(userSay.length == simonSay.length){

		newTimer = timer - (simonSay.length * 8) 

		if(newTimer > 80){timer = newTimer} 			

		mode = 1
		mssg.textContent = '...'
		userSay = []
		setTimeout(nextStage,700)
	}


})




play.addEventListener("click",()=>{
	
	points.textContent = '0'

	presentation()
	.then(()=>{
		play.classList.add('undisplay')
		mssg.textContent = '...'
		setTimeout(nextStage,700)
	})

})


checkUser()