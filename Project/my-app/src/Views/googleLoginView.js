
function GoogleView( {siwg,sowg} ) {    
    return (
        <div>
        <button onClick={() => siwg()}>Login</button>
        <button onClick={() => sowg()}>Sign Out</button>
    </div>
    );
    

}

export default GoogleView;
