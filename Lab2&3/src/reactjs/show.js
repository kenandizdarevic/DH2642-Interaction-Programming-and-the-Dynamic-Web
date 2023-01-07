export default 
function Show(props){
    const [hashState, setHash]= React.useState(window.location.hash);    
     
    function hashListenerACB(){ setHash(window.location.hash); }
    function componentWasCreatedACB(){ 
       window.addEventListener("hashchange",hashListenerACB);
       function isTakenDownACB(){      
           window.removeEventListener("hashchange",hashListenerACB);
       }
       return isTakenDownACB; 
    }
    React.useEffect( componentWasCreatedACB, [] );
    return(
        <div class={(hashState !== props.hash) ? "hidden" : ""} >
            {props.children}
        </div>
    )
  }