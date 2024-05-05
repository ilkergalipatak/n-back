import { Button, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from "react-router-dom";

function GameOver() {
    let navigate = useNavigate();
    const playerName = localStorage.getItem('playerName');

    function handleViewResultsClick() {
        // Go to Analysis route
        navigate('/analysis');
    }

    return (
        <VStack spacing={3}>
            <Text fontSize={'3xl'} >Oyun Bitti {playerName}</Text>
            <Button colorScheme="blue" onClick={handleViewResultsClick}>
                Sonuçları Görüntüle
            </Button>
        </VStack>
    );
}

export default GameOver;