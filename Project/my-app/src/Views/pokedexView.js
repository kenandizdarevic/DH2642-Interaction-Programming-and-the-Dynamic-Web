function PokedexView({pokemon, setPokeDetail}) {
    return (
        <div className ="forGrid">{pokemon.map(renderPokemon)}</div>
    )

    function renderPokemon(p) {

        function removeCSS() {
            const el = document.getElementById(p.name);
            el.classList.remove("loading");
            el.classList.remove("forAni")
          }

        function onPressed() {
            setPokeDetail(p)
        }
        function getgrid(param) {
            let num = param % 20;
            if (num >= 1 && num <= 5) {
              return 1;
            } else if (num >= 6 && num <= 10) {
              return 2;
            } else if (num >= 11 && num <= 15) {
              return 3;
            } else if (num >= 16 && num <= 20) {
              return 4;
            } else {
              return 0;
            }
          }
          

        return  <div key={p.name} onClick={onPressed} className={"zoom2 grid gr"+ getgrid(p.id)}>
                    <img id = {p.name} className="loading forAni" onLoad={removeCSS}
                        src={p.sprites.front_default} 
                        height="110" width="110" 
                        // style={{marginLeft: 10 + 'px'}}
                            />
                    <div className="gridText typewriter">
                        {p.id}.
                        {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                    </div>
                </div>
    }
}

//p.name.charAt(0).toUpperCase() + p.name.slice(1)

export default PokedexView;