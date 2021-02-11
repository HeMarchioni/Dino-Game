///////////////////////////////////////////////////////////////////////////////////////
/*  Desenvolvido por                                
    Henrique Marchioni  -  Tecnologia em Sistemas para internet - Fatec Rubens lara
*//////////////////////////////////////////////////////////////////////////////////////

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let position=0;            // posição inicial dinosauro 0
let estaPulando = false; // estado do dino (começa no chão sem pular)


function apertarTecla (event) {
    if ((event.which || event.keyCode) ===32) {    // Codigo da tecla pressionada (space)
        if ( estaPulando == false){    // se ele ja estiver no chão pode realizar outro salto
        pular();
        };
    };
};

function pular() {               // Função que realiza o pulo do Dinosauro
   
    estaPulando=true;
    

    let Pulo = setInterval(()=>{ 
        // == subida =============
        position+=20;              //sobe de 20 em 20px 
        dino.style.bottom = position + 'px';
        // == parada topo ========
        if (position >=160) {     // momento de parada do pulo (atinge 160px de altura)
            clearInterval(Pulo);
            // == descida =======  
            let descida = setInterval(()=>{  // inicio descida
                position-=20;               // desce em 20 em 20px
                dino.style.bottom = position +'px';
                // == parada inferior ==
                if (position <=0){  // momento de parar a descida atinge 0px
                    clearInterval(descida)
                    position=0;
                    estaPulando=false;
                };    
            },20); // intervalo da descida 20 milesegundos
         }; 
    },20);    // intervalo do subida  20 milesegundos 
};


function startCactus () {   // Função que cria os cactus e os move
    let positionCactus = 1000;    
    const cactus = document.createElement('div'); 
    let randowTime = Math.random()*5000;  // -> tempo de criação de cactus aleatorio (quando menor mais dificil)

    cactus.classList.add('cactus');  // -> adc a classe a div cactus
    background.appendChild(cactus);  // -> colocado dentro da div background

    let moveCactus = setInterval(()=>{   // -> mover o cactus a esquerda
        positionCactus-=10; // -> Intervalo de deslocamento a esquerda
        cactus.style.left=positionCactus + 'px';
        if (positionCactus < -60){  // -> excluindo o cactus que sai da tela
            clearInterval(moveCactus);
            background.removeChild(cactus);
        }
        // GAME - OVER ====
        else if (positionCactus > 0 && positionCactus < 60 && position < 60){ 
            clearInterval(moveCactus);
            document.body.innerHTML = innerHTML = "<h1> GAME OVER </h1>" 
            

        };

    },20); // -> velocidade do cactus se mover

    setTimeout(startCactus, randowTime);
};



startCactus();
document.addEventListener('keydown',apertarTecla);

//console.log(dino);