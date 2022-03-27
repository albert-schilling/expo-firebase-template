import React, {FC, useState, useMemo} from 'react'
import __ from '../misc/localisation'
import Tag from '../components/Tag'
import {ViewStyle} from 'react-native'
import {TStatus} from '../components/Themed'

const initialMessage: {
  visible: boolean
  text: string
  status: TStatus
} = {
  visible: false,
  text: '',
  status: 'success',
}

export default function useMessage(): [
  (text: string, status?: TStatus) => void,
  () => void,
  FC<{style?: ViewStyle}>
] {
  const [message, setMessage] = useState(initialMessage)
  const {visible, text, status} = message
  const showMessage = (text: string, status?: TStatus) => {
    setMessage({
      ...message,
      visible: true,
      text,
      status: status ?? message.status,
    })
  }

  const resetMessage = () => {
    message.visible && setMessage(initialMessage)
  }

  const MessageComponent: FC<{style?: ViewStyle}> = visible
    ? ({style}: {style?: ViewStyle}) => (
        <Tag text={text} status={status} style={style} />
      )
    : () => <></>

  return [showMessage, resetMessage, MessageComponent]
}
