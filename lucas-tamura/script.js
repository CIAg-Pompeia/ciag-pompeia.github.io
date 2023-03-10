const pokemonName = document.querySelector('.Pokemon__Nome') 
const pokemonNumber = document.querySelector('.Pokemon__Number') 
const pokemonImage = document.querySelector('.pokemon_image') 
const pokemonType = document.querySelector('.pokemon__type') 
const pokemonHP = document.querySelector('.pokemon__hp')
const pokemonWeight = document.querySelector('.pokemon__weight')            /*DEFINIR VARIÁVEIS*/
const pokemonHeight = document.querySelector('.pokemon__height')

const cardType = document.querySelector('.card__type') 
const cardName = document.querySelector('.card__name') 
const cardHP = document.querySelector('.card__hp')
const cardImage = document.querySelector('.imagePokemon__card')
const cardAttack = document.querySelector('.card__attack')
const cardDefense = document.querySelector('.card__defense')
const cardEspecialAttack = document.querySelector('.card__especialattack')
const cardEspecialDefense = document.querySelector('.card__especialdefense')
const cardSeed = document.querySelector('.card__speed')
const cardAbilityOne = document.querySelector('.abilityOne')
const cardAbilityTwo = document.querySelector('.abilityTwo')


const form = document.querySelector('.form')
const input = document.querySelector('.input__search')
const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')



let searchPokemon = 1;  /*COMANDO PARA O POKEMON INICIAL SER SEMPRE 1*/

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIResponse.status == 200){                         /*FUNÇÃO PARA ACESSAR A API*/
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...'
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['other']['home']['front_default'];
        pokemonType.innerHTML = data['types']['0']['type']['name'];
        pokemonHP.innerHTML = data['stats']['0']['base_stat'];
        pokemonWeight.innerHTML = data.weight/10;
        pokemonHeight.innerHTML = data.height/10;

        cardType.innerHTML = data['types']['0']['type']['name'];
        cardName.innerHTML = data.name;
        cardHP.innerHTML = data['stats']['0']['base_stat'];
        cardImage.src = data['sprites']['other']['official-artwork']['front_default'];
        cardAttack.innerHTML = data['stats']['1']['base_stat'];
        cardDefense.innerHTML = data['stats']['2']['base_stat'];
        cardEspecialAttack.innerHTML = data['stats']['3']['base_stat'];
        cardEspecialDefense.innerHTML = data['stats']['4']['base_stat'];
        cardSeed.innerHTML = data['stats']['5']['base_stat'];
        cardAbilityOne.innerHTML = data['abilities']['0']['ability']['name'];
        cardAbilityTwo.innerHTML = data['abilities']['1']['ability']['name'];


        searchPokemon = data.id                                             /*FUNÇÃO QUE EXIBE AS INFORMAÇÕS RETIRADAS DA API*/
    } else{
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '0';
        pokemonImage.src = data['sprites']['other']['home']['front_default'];
        pokemonType.innerHTML = '0';
        pokemonHP.innerHTML = '0';
        pokemonWeight.innerHTML = '0';
        pokemonHeight.innerHTML = '0';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = ''                                                    /*FUNÇÃO QUE COLETA A INFORMAÇÃO DIGITADA PELO USUÁRIO*/
})

buttonPrev.addEventListener('click', () =>{
    if(searchPokemon >1){
        searchPokemon -=1;                                      /*FUNÇÃO PARA O BOTÃO DE ANTERIOR*/
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener('click', () =>{
    searchPokemon +=1;                                  /*FUNÇÃO PARA O BOTÃO DE PRÓXIMO*/
    renderPokemon(searchPokemon)
})

renderPokemon('1')