import React, {useEffect, useState} from 'react';

export default function GPT ({mergeContent, callbackGPT}){
    console.log("전달 받은 내용 : ", mergeContent);
    const [messages, setMessages] = useState([]);
    const addCommand = mergeContent + " 라는 내용에 이어 끊기더라도 반드시 공백을 포함해서 한글 50 글자 이하로 문장 전체에서 내용이 겹치지 않도록 흐름이 이어지는 이야기를 작성해줘" // 이전 글 내용 취합한 것에 명령문 추가
    const [userInput, setUserInput] = useState(addCommand); // 사용자로부터 입력받은 정보를 입력
    const [loading, setLoading] = useState(false);
    const [gptAnswer, setGptAnswer] = useState(""); // GPT 로부터 받은 답변(부모 comp로 전달)

    const apiKey = 'sk-proj-4IlfdHz1B4Rip9EpW7DjT3BlbkFJn4qyAOW8A8qax0Md2ZJy';
    const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

    const addMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    // GPT 에게 내용 전송하는 함수
    const handleSendMessage = async () => {
        const message = userInput.trim();
        if (message.length === 0) return;

        addMessage('user', message);
        setUserInput('');
        setLoading(true);

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: message }],
                    max_tokens: 50, // 답변 최대 글자 수,
                    top_p: 1, // 다음 단어를 선택할 때 상위 p%의 확률 분포를 사용하는 매개변수, 높을수록 안정된 선택
                    temperature: 1, // 답변의 다양성과 창의성, 낮을수록 일관적 (0~2)
                    frequency_penalty: 1, // 전문적 단어의 빈도, 낮을수록 전문적 (0~1)
                    presence_penalty: 1, // 반복되는 구문 억제, 낮을수록 억제하지 않음 (0~1)
                    stop: ['문장 생성 중단 단어'],
                }),
            });

            const data = await response.json();
            const aiResponse = data.choices?.[0]?.message?.content || '돈이 없습니다.';
            setGptAnswer(aiResponse); // GPT 의 응답
            const close = false // GPT comp unmount
            callbackGPT(close, aiResponse);
            addMessage('bot', aiResponse);
        } catch (error) {
            console.error('오류 발생!', error);
            addMessage('오류 발생!');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };

    // 사용자에게 문장을 입력받으면 자동으로 GPT 에게 내용 전송해 답변 받기
    useEffect(() => {
        handleSendMessage();
    }, [userInput]);
}