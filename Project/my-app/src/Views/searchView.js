import { Link,useNavigate } from 'react-router-dom'
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import searchSound from "../Assets/Search.wav"

function SearchView(props) {
    const navigation = useNavigate()
    function tempACB(){
        return null;
    }

    function setSearchTextACB(txt) {
        props.searchPokemon(txt.target.value);
    }

    function onSearch() {
        new Audio(searchSound).play()
        props.findPokemon();
        props.setSearch()
    }

    function nextPage() {
        props.nextPokemon(1);
    }

    function previousPage() {
        props.previousPokemon(0);
    }

    function handleKeypress(event) {
        if (event.key === 'Enter') {
            onSearch();
        }
    }

  return (
    <div>
        <TextField  className=""
                    margin="normal"
                    placeholder="e.g. Blastoise"
                    label="Search" onChange={setSearchTextACB}
                    onKeyPress={handleKeypress}
                    InputProps={{
                        style: { backgroundColor: '#ffffff' },
                    }}></TextField>
       <div>
           <ButtonGroup>
               <Button sx={{m: 1, p: 1}} variant="contained" className="centerBtns" onClick ={previousPage} disabled={props.prev === null} >Previous page</Button>
               <Button sx={{m: 1, p: 1}} variant="contained" className="" onClick ={nextPage} disabled={props.next === null} >Next page</Button>
           </ButtonGroup>
           <Button variant="contained" className="menuBtnSearch" onClick = {() => {navigation("/Menu")}}>Menu!</Button>
       </div>
    </div>
  )
}

export default SearchView;

