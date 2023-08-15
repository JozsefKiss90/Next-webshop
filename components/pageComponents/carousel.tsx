import React from "react"; 
import { useState, useEffect } from "react";
import Slider from "react-slick";
import Link from "next/link"
import type {NextPage } from "next";
import Image from "next/image";

interface PostsProps {
    array: { _id: string; name: string; img: string; category: string; price: number; __v: number; }[];
    sendDataToParent : (_id: any) => void
 }

 /*interface arrProps {
    array: { _id: string; name: string; img: string; category: string; price: number; __v: number; }[];
 }*/

 export const Carousel : NextPage<PostsProps> = (props) => {

    const [zoomed, setZoomed] = useState ({})
    const [fading_3, setFading_3] = useState(false)

    const [indexValue, setIndexValue] = useState<any>()

    useEffect(() => {
        setZoomed('backgroundSize:550')
      }, []);

    useEffect(() => {
        setFading_3(true)
       }, [fading_3]); 

    const classes_4 = fading_3 ? 'zoomClass' : 'zoomClass hide'
    const [imageIndex, setImageIndex] = useState<number>(0);

    useEffect(() => {
        setIndexValue(props.array[imageIndex])
       }, [imageIndex, props]);
    
    useEffect(() => {
        props.sendDataToParent(indexValue);
       }, [indexValue, props]); 
    
    interface  Settings {
        readonly children: Element[],
        focusOnSelect: boolean,
        infinite: boolean, 
        lazyLoad: boolean,
        speed: number,
        slidesToShow: number,
        centerMode: boolean,
        centerPadding: number,
        beforeChange: (current:number, next:number) => void
        }


    const settings : Settings = {
        children: [],
        focusOnSelect: true,
        infinite: true, 
        lazyLoad: true,
        speed: 600,
        slidesToShow: 3,
        centerMode: true,
        centerPadding: 0,
        beforeChange: (current, next) => setImageIndex(next),
    };
    return (
    <div className="">
        <Slider {...settings as any} className={classes_4}>
            {props.array.map((img, idx) => ( 
            <div key={img._id} className={[`${idx}` === `${imageIndex}` ? "slide activeSlide" : "slide"].join(' ')}>
                {idx === imageIndex ?
                    <Link href="/">
                        <Image src={img.img} alt={img._id}  width={350} height={350}/>
                    </Link> :
                    <Image src={img.img} alt={img._id}  width={350} height={350}/>
                }
            </div>
            ))}

        </Slider> 
    </div>
    );
}

export default Carousel;