function ToolButton({ css='', selectedColors, ...props }) {
  return e("button", { className: "tools" + css, ...props,
        style: { color: selectedColors[0], borderColor: selectedColors[0]}
      })
}

function FileInputButton({ text, onLoad, selectedColors, css='' }) {
  const fileInputRef = React.useRef(null);

  function handleButtonClick() {
    fileInputRef.current.click();
  }

  function handleFileInputChange(event) {
    const files = event.target.files;
    const fileContents = [];
  
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = function (event) {
        fileContents.push(event.target.result);
  
        if (fileContents.length === files.length) {
          onLoad(fileContents);
        }
      };
      reader.readAsText(files[i]);
    }
  }
  

  return [
      e("input", { className:"upload", ref: fileInputRef, onChange: handleFileInputChange, type:"file", accept: ".hy3,.HY3", multiple:true}),
      e(ToolButton, { onClick: handleButtonClick, selectedColors }, text)
    ]
}