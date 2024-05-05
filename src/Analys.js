import { Box, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import db from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import 'firebase/compat/firestore';

export default function Analysis() {
    const [gameData, setGameData] = useState({});

    useEffect(() => {
        const data = localStorage.getItem('gameData');
        if (data) {
            const parsedData = JSON.parse(data);
            setGameData(parsedData);

            // calculate percents
            const correctMatchPercent = parsedData.totalMatches > 0 ? ((parsedData.correctMatches / parsedData.totalMatches) * 100).toFixed(2) : 0;
            const missedMatchPercent = parsedData.totalMatches > 0 ? ((parsedData.missedMatches / parsedData.totalMatches) * 100).toFixed(2) : 0;
            const falseAlarmPercent = parsedData.totalNonMatches > 0 ? ((parsedData.falseAlarms / parsedData.totalNonMatches) * 100).toFixed(2) : 0;

            // create new data object
            const newData = {
                ...parsedData,
                correctMatchPercent,
                missedMatchPercent,
                falseAlarmPercent
            };

            setDoc(doc(db, 'users', localStorage.getItem('playerName')), newData)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    }, []);

    const { totalMatches = 0, totalNonMatches = 0, correctMatches = 0, missedMatches = 0, falseAlarms = 0 } = gameData;
    const correctMatchPercent = totalMatches > 0 ? ((correctMatches / totalMatches) * 100).toFixed(2) : 0;
    const missedMatchPercent = totalMatches > 0 ? ((missedMatches / totalMatches) * 100).toFixed(2) : 0;
    const falseAlarmPercent = totalNonMatches > 0 ? ((falseAlarms / totalNonMatches) * 100).toFixed(2) : 0;
    const playerName = localStorage.getItem('playerName');

    return (
        <Box height="100vh" display="grid" placeItems="center">
            <VStack spacing={3} align="start" justifyContent={'center'}>
                <Text fontSize="2xl">{playerName} için Test Sonuçları</Text>
                <Text>{`Bu blokta toplam 25 deneme vardı`}</Text>
                <Text>{`Eşleşen toplam deneme sayısı: ${totalMatches}`}</Text>
                <Text>{`Eşleşme olmayan toplam deneme sayısı: ${totalNonMatches}`}</Text>
                <Text>{`Doğru şekilde eşleşen öğelerin sayısı: ${correctMatches}`}</Text>
                <Text>{`Kaçırılan öğelerin sayısı: ${missedMatches}`}</Text>
                <Text>{`Yanlış alarm sayısı: ${falseAlarms}`}</Text>
                <Text>{`Doğru eşleşme yüzdesi: ${correctMatchPercent} %`}</Text>
                <Text>{`Yanlış eşleşme yüzdesi: ${missedMatchPercent} %`}</Text>
                <Text>{`Yanlış alarm yüzdesi: ${falseAlarmPercent} %`}</Text>
            </VStack>
        </Box>
    );
}