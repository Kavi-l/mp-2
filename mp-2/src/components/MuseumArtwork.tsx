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
    max-width: 400px;
    max-height: 400px;
    border-radius: 15px;
    margin: auto;
`;


export default function MuseumArtwork(props : { data:Artwork[] } ){
    return (
        <AllArtsDiv >
            {   
                props.data.map((char: Artwork) =>
                    <SingleArtDiv key={char.id}>
                        <h2>{char.title}</h2>
                        <StyledImg src={char.primaryImage} alt={`image of ${char.title}`} /> 
                        <p>Year: {char.accessionYear}</p>
                    </SingleArtDiv>
                )
            }
        </AllArtsDiv>
    );
}