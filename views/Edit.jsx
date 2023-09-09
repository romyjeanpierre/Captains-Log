const React = require("react");

function Edit({log}) {
    return (
        <div>
            <h2>Edit Log</h2>
            <form action= {`/logs/${log._id}?_method=PUT`} method="POST">

                Title: <input type="text" name="title" defaultValue={log.title} required/>
                
                <textarea name="entry"  defaultValue={log.entry} required></textarea>

                ShipIsBroken<input type="checkbox" name="shipIsBroken" defaultChecked={log.shipIsBroken} />
                
                <input type="submit" value="Update"/>
            </form>
        </div>    
    );
}




module.exports = Edit;