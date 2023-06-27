import React from "react";
import { useState } from "react";
import Arrow from "./static/svg/arrow";
import styles from "../../styles/Items.module.scss"

function ArrowToggler(props) {
    const [arrowPos, setArrowPos] = useState(false)
    const [boxHeight, setBoxHeight] = useState(false)

    function arrowToggle() { 
        setArrowPos(!arrowPos)
        setBoxHeight(!boxHeight)
      }
    
    const arrowUp = `${arrowPos ? styles.arrowPath1_moved : styles.arrowPath_1}`
    const arrowDown = `${arrowPos ? styles.arrowPath2_moved : styles.arrowPath_2}`
    const expand = `${boxHeight ? styles.itemDescription_expand : styles.itemDescription}`

   return (
    <div style={props.style} className={expand} onClick={arrowToggle}>
        <div style={{textAlign: "center", lineHeight:"2.3rem"}}>
            {props.title}
        </div>
        <div className={styles.itemArrow}>
            <Arrow className={arrowUp} className2={arrowDown}/>
        </div>
    </div>
   )
}

export default ArrowToggler