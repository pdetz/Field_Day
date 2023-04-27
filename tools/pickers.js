function PaletteButton({className='palette', emoji='', selected = '', onClick, ...props}) {
    return e("button", {className: className + selected, onClick, ...props}, emoji)
}

function Picker({items, selectedItem, css="", buttonProps, onButtonClick}) {
    return e(Div, {css: "palette" + css}, 
        items.map((item, index) => e(PaletteButton, 
            {key: index, ...buttonProps(item),
            selected: selectedItem == item ? ' sel' : '',
            onClick: () => onButtonClick(item) }
        ))
    )
}

function ColorPicker({colorRows, selectedColors, onColorClick, setSelectedColors}){
    return e(Div, {css: "b"}, colorRows.map( (colors, row) => {
        return e(Picker, {key: row, css: " row"+row, items: colors, selectedItem: selectedColors[row],
            onButtonClick: (color) => onColorClick(selectedColors, row, color, setSelectedColors),
            buttonProps: (color) => {
                return {style:{backgroundColor: color, color:color}}
            }
        })
    })
    )
}

function EmojiPicker({emojis, selectedEmojis, selectedColors, onEmojiClick, setSelectedEmojis}){

    const [which, setWhich] = React.useState(0);
    const handleClick = () => setWhich(1 - which);

    return e(Div, {css: "b"}, 
    
        e("div", {className: 'toggle', onClick: handleClick}, ["Regular Swims", "Swim Ups"].map((label, l) => {
            return e("div", {key: l, className: "toggle"+l, 
                style: {color: selectedColors[0], filter: "brightness(" + (l==which ? "100%" : "50%") + ")",
                filter: "grayscale(" + (l==which ? "0%" : "70%") + ")" }} , label)
            })
        ),
        
        e("div", {className: "underline"}, e("div", {className: "line pos"+which, style:{borderColor: selectedColors[0]}})),

        e("div", {className: 'slide'},
            e("div", {className: 'slider sliiide pos'+which}, [0, 1].map(n => {
                return e(Picker, {key: n, items: emojis, selectedItem: selectedEmojis[n],
                    css: n == which ? " on" : " off",
                    onButtonClick: (emoji) => onEmojiClick(selectedEmojis, n, emoji, setSelectedEmojis),
                    buttonProps: (emoji) => { 
                            return {emoji:emoji, className:'palette swim',
                                style: { backgroundImage: "radial-gradient(circle, #fff, 25%," + (selectedEmojis[n] == emoji ? selectedColors[1] + ", 60%," + selectedColors[0] + " )" : "#fff)")}
                            }
                    }
                })
            })
        )
    ))
}