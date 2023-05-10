const Progressbar = ({progress = "40", data="1", height = "12px", display}) => {
    //  console.log(display)
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: '#FAE1CD',
        borderRadius: 40,
        display:display,
        marginTop: 10,
      }
      
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: "#514C9F",
        borderRadius:40,
        textAlign: 'right'
      }
      
      // const progresstext = {
      //   padding: 10,
      //   color: 'black',
      //   fontWeight: 900,
      //   height: {data}
      // }
        
    return (
    <div style={Parentdiv}>
      <div className="childDiv" progress={progress} style={Childdiv}>
      </div>
    </div>
    )
}
  
export default Progressbar;