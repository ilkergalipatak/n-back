import { Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StartGame() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault(); // prevents page from refreshing
        localStorage.setItem('playerName', name);
        navigate("/game");
    };

    return (
        <VStack spacing={5}>
            <Text fontSize={'3xl'}>N-Back Hafıza Oyunu</Text>
            <Text> Hafıza Oyununa hoş geldiniz. Bu görevde harfleri göreceksiniz. Her harf birkaç saniye boyunca gösterilir. Aynı harfi 2 harf önce görüp görmediğinize karar vermeniz gerekir. Buna n=2 geri görevi denir.
                Eğer aynı harfi 2 harf önce gördüyseniz "Eşleme" düğmesine basarsınız. Eğer doğru yaptıysanız harfin etrafında yeşil renkler görüyorsunuz. Düğmeye basmamanız gerekirken basarsanız harfin etrafında "kırmızı" görürsünüz.</Text>
            <FormControl id="name" isRequired>
                <FormLabel>İsminizi Girin</FormLabel>
                <Input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="İsminizi girin"
                />
            </FormControl>
            <Button colorScheme="blue" onClick={handleClick}>Oyunu Başlat</Button>
        </VStack>
    );
}

export default StartGame;