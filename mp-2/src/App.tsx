import { useEffect, useState } from "react";
import MuseumArtwork from "./components/MuseumArtwork.tsx";
import { Artwork } from "./interfaces/Artworks.ts";
import styled from "styled-components";

const ParentDiv = styled.div`
    width: 80vw;
    margin: auto;
    border: 5px darkgoldenrod solid;
`;

export default function App() {

    // useState Hook to store Data.
    const [data, setData] = useState<Artwork[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawIds = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects");
            const { objectIDs }: { objectIDs: number[] } = await rawIds.json();

            let selectedObjects: Artwork[] = [];

            for (let i = 0; i < objectIDs.length; i += 10000) {
                const id = objectIDs[i];

                const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                const obj: Artwork = await res.json();
                
                // select artworks that have an image
                if (obj.primaryImage !== "") {
                    selectedObjects = [...selectedObjects, obj];
                }
            }

            setData(selectedObjects);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was an error: " + e));
    }, [data.length]);

    return (
        <ParentDiv>
            <MuseumArtwork data={data} />
        </ParentDiv>
    )
}
