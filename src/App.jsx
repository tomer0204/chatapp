import {Button, Container} from '@chakra-ui/react';



function App() {


  return (
    <>
        <Container maxW = '620px'>
            <Button onClick={setColorMode}>hi
            set {colorMode === "dark" ? "light" : "dark"}
            </Button>
        </Container>
    </>
  )
}

export default App
