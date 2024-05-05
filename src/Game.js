import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Router, useNavigate } from 'react-router-dom';
import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';


const letterArray = ['A', 'B', 'C', 'D', 'E', 'H', 'I', 'K', 'L', 'M', 'O', 'P', 'R', 'S', 'T'];
function randomLetter() {
    return letterArray[Math.floor(Math.random() * letterArray.length)];
}
function Game() {
    const [twoBack, setTwoBack] = useState('');
    const [oneBack, setOneBack] = useState('');
    const [currentLetter, setCurrentLetter] = useState(randomLetter());
    const [feedbackImage, setFeedbackImage] = useState('grey_feedback.png');

    const [score, setScore] = useState(0);
    const [isMatch, setIsMatch] = useState(false);
    const [clickDisabled, setClickDisabled] = useState(false);
    const [trials, setTrials] = useState(0);
    const [totalMatches, setTotalMatches] = useState(0);
    const [totalNonMatches, setTotalNonMatches] = useState(0);
    const [correctMatches, setCorrectMatches] = useState(0);
    const [missedMatches, setMissedMatches] = useState(0);
    const [falseAlarms, setFalseAlarms] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    let navigate = useNavigate();
    const playerName = localStorage.getItem('playerName');
    // Rastgele bir harf seçip letters dizisine ekler
    function nextLetter() {
        setTwoBack(oneBack);
        setOneBack(currentLetter);

        const isMatchChance = Math.random() > 0.67;
        if (isMatchChance) {
            setCurrentLetter(twoBack);
            setIsMatch(true);
            setTotalMatches(totalMatches + 1); // Adds to total matches if there is a match
        } else {
            let newLetter = randomLetter();
            while (newLetter === twoBack && twoBack !== '') {
                newLetter = randomLetter();
            }
            setCurrentLetter(newLetter);
            setIsMatch(false);
            setTotalNonMatches(totalNonMatches + 1); // Adds to total non-matches if there isn't a match
        }

        // Set the feedback image state to grey_feedback.png
        setFeedbackImage('grey_feedback.png');
    }
    // Saniyede bir rastgele harf üretir
    useEffect(() => {
        if (trials >= 25) {
            setGameOver(true);
            localStorage.setItem('gameData', JSON.stringify({ totalMatches, totalNonMatches, correctMatches, missedMatches, falseAlarms }));
            navigate('/endgame', { totalMatches, totalNonMatches, correctMatches, missedMatches, falseAlarms });
            return;
        }
        const timer = setInterval(() => {
            if (!clickDisabled && isMatch) {
                setMissedMatches(missedMatches + 1);
            }
            nextLetter();
            setTrials(trials + 1);
            setClickDisabled(false);

        }, 3500);
        return () => clearInterval(timer);
    }, [oneBack, twoBack, trials, clickDisabled]);

    // İkinci harften sonrasında butona basıldığında kontrol yapar
    function handleBtnClick() {
        if (gameOver) {
            return;
        }
        if (isMatch) {
            setScore(score + 1);
            setFeedbackImage('correct_feedback.png')
            setCorrectMatches(correctMatches + 1);
            setMissedMatches(missedMatches - 1);
        } else {
            setScore(score - 1);
            setFeedbackImage('error_feedback.png')
            setFalseAlarms(falseAlarms + 1);
        }

        setClickDisabled(true);
    }
    if (gameOver) {
        return null;
    } else {
        return (
            <VStack spacing={5}>
                {/* <Text fontSize={'3xl'} >2-Back Test</Text> */}
                <Box position="relative" mt={200}>
                    <Image src={`letters/${feedbackImage}`} alt="background" />
                    <Image
                        position="absolute"
                        left="50%"
                        top="50%"
                        transform="translate(-50%, -50%)"
                        src={`letters/letter${currentLetter}.png`}
                        alt={currentLetter}
                    />
                </Box>

                <Button mt={50}
                    onClick={handleBtnClick}
                    disabled={clickDisabled}
                    colorScheme="teal"
                >
                    Eşleme
                </Button>
            </VStack>
        );
    }
}
export default Game;