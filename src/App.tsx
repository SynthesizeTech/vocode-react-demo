import '@fontsource/inter'
import './App.css'

import { ChakraProvider, Text, VStack } from '@chakra-ui/react'
import Conversation from './components/Conversation'

import { WarningIcon } from '@chakra-ui/icons'
import { isChrome, isMobile, isSafari } from 'react-device-detect'
import {
  AzureSynthesizerConfig,
  ChatGPTAgentConfig,
  DeepgramTranscriberConfig,
  VocodeConfig,
} from 'vocode'

const App = () => {
  const transcriberConfig: Omit<
    DeepgramTranscriberConfig,
    'samplingRate' | 'audioEncoding'
  > = {
    type: 'transcriber_deepgram',
    chunkSize: 2048,
    endpointingConfig: {
      type: 'endpointing_punctuation_based',
    },
  }
  const agentConfig: ChatGPTAgentConfig = {
    type: 'agent_chat_gpt',
    initialMessage: {
      type: 'message_base',
      text: 'Hello and thanks for calling The Matian Firm. How can I help you today?',
    },
    temperature: 0.6,
    // promptPreamble:
    // 'You just saw that I left a request for a quote on your website. You are more than happy to help. Please ask me a few questions, then connect them with someone on your team. To start, please let me know your first and last name, along with the address where you need the service? Plus, ask me about exactly what I need help with on my HVAC system. Ask me to get the best call-back phone number in case we get disconnected. Ask me when the best time to schedule someone to take a look. Make sure to collect this information before you connect me with someone on your team.',
    // promptPreamble:
    //   'You are a front desk worker named Bob from DeskMakers, and you are an expert on Purchase Orders. Your job is to call Vendors, and update statuses on new and existing POs (aka Purchase Orders) that were sent by DeskMarkers. Right now you need to get information on PO 23-05312. This PO had an expected delivery date of May 23, but DeskMarkers did not receive all of the items in PO. DeskMakers is missing 3 laminated drawsers (part number 42-322) and 9 steel hinges (part number 23-A-2). You must ask questions to the Vendor to find out the new ETA for the missing items.',
    promptPreamble:
      'You are named Ryan, and you work at front desk of The Matian Law Firm. You are professional and helpful but your statements are brief. Your law firm specializes in Immigration, Criminal, Personal Injury and Employment Law. People looking for legal services call you, and it is your job to ask them information about the problem you are having. You need to ask clarifying questions to understand the specific legal problem they have. Then, if they are qualified, meaning their problem falls into one of your specialities, you must schedule an appointment as soon as possible with me. In order to schedule the appointment, ask for their contact information, including name, phone and email, as well as a good appointment time. The meeting you will schedule, will be between me and an attorney over the phone.',
    endConversationOnGoodbye: true,
    generateResponses: true,
    cutOffResponse: {},
  }
  const synthesizerConfig: Omit<
    AzureSynthesizerConfig,
    'samplingRate' | 'audioEncoding'
  > = {
    type: 'synthesizer_azure',
    shouldEncodeAsWav: true,
    voiceName: 'en-US-SteffanNeural',
    rate: 20,
  }
  const vocodeConfig: VocodeConfig = {
    apiKey: process.env.REACT_APP_VOCODE_API_KEY || '',
  }

  return (
    <ChakraProvider>
      {(isMobile || !isChrome) && !isSafari ? (
        <VStack padding={10} alignItems="center">
          <WarningIcon boxSize={100} />
          <Text paddingTop={4}>
            This demo works on: Chrome (desktop) and Safari (desktop, mobile)
            only!
          </Text>
        </VStack>
      ) : (
        <Conversation
          config={{
            transcriberConfig,
            agentConfig,
            synthesizerConfig,
            vocodeConfig,
          }}
        />
      )}
    </ChakraProvider>
  )
}

export default App
