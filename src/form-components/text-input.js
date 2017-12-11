import React from 'react';

function Textinput(props) {
    return (
        <input onClick={() => props.onRemove(props.id)} type='text' placeholder={props.placeholder} />
    );
}

export default Textinput;