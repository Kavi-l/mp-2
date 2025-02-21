import styled from "styled-components";
import {Artwork} from "../interfaces/Artworks.ts";

const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: lightblue;
    border: 5px solid black;
`;

const SingleCharDiv=styled.div`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    border: 3px darkred solid;
    border-radius: 25px;
    font: italic small-caps bold calc(2px + 1vw) Papyrus, fantasy;
    text-align: center;
`;

export default function MuseumArtwork(props : { data:Artwork[] } ){
    return (
        <AllCharsDiv >
            {
                props.data.map((char: Artwork) =>
                    <SingleCharDiv key={char.id}>
                        <h1>{char.title}</h1>
                        <img src={char.primaryImage} alt={`image of ${char.title}`} />
                    </SingleCharDiv>
                )
            }
        </AllCharsDiv>
    );
}