import { useEffect, useState } from "react";
import MuseumArtwork from "./components/MuseumArtwork.tsx";
import { Artwork } from "./interfaces/Artworks.ts";
import styled from "styled-components";

const ParentDiv = styled.div`
    width: 80vw;
    margin: auto;
    border: 5px solid #2C3E50;
    border-radius: 10px;
    background-color: #FF8080FF;
`;

const StyledHeader =  styled.h1`
    text-align: center;
    margin-bottom: 0;
`

const StyledP = styled.p`
    text-align: center;
    margin-top: 0;
`

export default function App() {

    // useState Hook to store Data.
    const [data, setData] = useState<Artwork[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawIds = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
            // list is of Object Id's, not of the objects themselves
            const { objectIDs }: { objectIDs: number[] } = await rawIds.json();

            let selectedObjects: Artwork[] = [];

            // total 500,000 objects, so select a small sample to save loading time
            for (let i = 0; i < objectIDs.length; i += 10000) {
                const id = objectIDs[i];

                // fetch the actual object/artwork at the id index
                const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                const obj: Artwork = await res.json();
                
                // select artworks only if it has image w/ it
                if (obj.primaryImage !== "") {
                    selectedObjects = [...selectedObjects, obj];
                }
            }

            setData(selectedObjects);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was an error: " + e));
    // dont include data.length in the dependecy array to prevent infinite reloading
    // when we add new objects into the objects list
    }, []);

    return (
        <ParentDiv>
            <StyledHeader>Metropolitan Museum of Art</StyledHeader>
            <StyledP> Sample Artworks </StyledP>
            <MuseumArtwork data={data} />
        </ParentDiv>
    )
}
