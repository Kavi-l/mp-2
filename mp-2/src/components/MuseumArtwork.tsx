import styled from "styled-components";
import {Artwork} from "../interfaces/Artworks.ts";

const AllArtsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: #FFBE71FF;
`;

const SingleArtDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 0.5% 1%;
    margin: 1%;
    border: 1px solid black;
    border-radius: 10px;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
    box-shadow: 2px 2px 8px black;
    background-color: #67A8E1FF;
    
`;

const StyledImg=styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
`;

const ImgDiv=styled.div`
    width: 75%;
    height: 75%;
    margin: auto;
`;



export default function MuseumArtwork(props : { data:Artwork[] } ){
    return (
        <AllArtsDiv >
            {   
                props.data.map((char: Artwork) =>
                    <SingleArtDiv key={char.id}>
                        <h2>{char.title}</h2>
                        <ImgDiv><StyledImg src={char.primaryImage} alt={`image of ${char.title}`} /> </ImgDiv>
                        <p>Year: {char.accessionYear}</p>
                    </SingleArtDiv>
                )
            }
        </AllArtsDiv>
    );
}