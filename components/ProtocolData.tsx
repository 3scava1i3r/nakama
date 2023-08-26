import Box from './shared/Box'

import { BoxMotion } from './shared/Box'
import ProtocolCard from './ProtocolCard'

import { AnimatePresence, AnimatePresenceProps } from 'framer-motion'
import useSWR from 'swr'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Button from '../components/shared/Button'
// const fetcher = (url: string) => axios.get(url).then(res => res.data)
import { innerDisplayMethod } from '../contexts/cardSettings'

interface NewAnimatePresenceProps extends Omit<AnimatePresenceProps, 'children'> {
  children: React.ReactNode
}

function AnimatedComponent({ children }: { children: React.ReactNode }) {
  const NewAnimatePresence: React.FC<NewAnimatePresenceProps> = AnimatePresence

  return <NewAnimatePresence>{children}</NewAnimatePresence>
}

import { useRecoilState } from 'recoil'
const fetcher = (url: string) =>
  axios
    .get(url, { params: { includeContractMetadata: 'true', key: process.env.NEXT_PUBLIC_API_KEY }, headers: { Accept: 'application/json' } })
    .then((res) => res.data)
export type ProtocolData = {
  refId: string
  title: string
  content: string
  proposer: string
  totalVotes: number
  currentState: string
  choices: string[]
  startTimestamp: number
  endTimestamp: number
  results: [
    {
      total: number
      choice: number
    }
  ]
}

const ProtocolData = ({
  container,
  name,
  border,
  shadow,
  background,
}: {
  container: any
  name?: string
  background: string
  border: string
  shadow: string
}) => {
  //   console.log('back::', background)
  const { data, error, isValidating } = useSWR(`https://api.boardroom.info/v1/protocols/${name}/proposals`, fetcher)
  const [selected, setSelected] = useState(0)
  const [display, setDisplay] = useRecoilState(innerDisplayMethod)

  if (error) {
    return <></>
  }
  if (isValidating) {
    return <Box css={{ height: '512px' }}></Box>
  }

  return (
    <>
      <Box
        layout="flexBoxRow"
        css={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: '$2',
          maxWidth: '1024px',
          overflow: 'visible',
          gap: '$0',
          paddingLeft: '$3',
          width: '100%',
          flexWrap: 'nowrap',
        }}></Box>

      <Box layout="flexBoxRow" css={{ gap: '$1', padding: '$2 0' }}>
        <Button
          onClick={() => {
            setDisplay({ type: 'proposals' })
          }}
          selected={display.type === 'proposals' ? true : false}
          color={display.type === 'proposals' ? 'black' : 'gray'}
          look="outlined">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
            <path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            <path
              d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
            <path
              d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
          </svg>{' '}
          Proposals
        </Button>
        <Button
          selected={display.type === 'voters' ? true : false}
          onClick={() => {
            setDisplay({ type: 'voters' })
          }}
          color={display.type === 'voters' ? 'black' : 'gray'}
          look="outlined">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.49991 0.877075C3.84222 0.877075 0.877075 3.84222 0.877075 7.49991C0.877075 11.1576 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1576 14.1227 7.49991C14.1227 3.84222 11.1576 0.877075 7.49991 0.877075ZM1.82708 7.49991C1.82708 4.36689 4.36689 1.82707 7.49991 1.82707C10.6329 1.82707 13.1727 4.36689 13.1727 7.49991C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49991ZM8.37287 7.50006C8.37287 7.98196 7.98221 8.37263 7.5003 8.37263C7.01839 8.37263 6.62773 7.98196 6.62773 7.50006C6.62773 7.01815 7.01839 6.62748 7.5003 6.62748C7.98221 6.62748 8.37287 7.01815 8.37287 7.50006ZM9.32287 7.50006C9.32287 8.50664 8.50688 9.32263 7.5003 9.32263C6.49372 9.32263 5.67773 8.50664 5.67773 7.50006C5.67773 6.49348 6.49372 5.67748 7.5003 5.67748C8.50688 5.67748 9.32287 6.49348 9.32287 7.50006Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"></path>
          </svg>{' '}
          Voters
        </Button>
      </Box>
      <Box layout="flexBoxRow" css={{ gap: '$1', padding: '$2 0' }}>
        {data.data.length === 0 && <Box>No proposals yet</Box>}
        {data.data.map((_: any, i: number) => (
          <Box
            onClick={() => {
              setSelected(i)
            }}
            css={{
              cursor: 'pointer',
              minWidth: i === selected ? '256px' : '0px',
              background: i === selected ? border : 'inherit',
              boxShadow: i === selected ? shadow : 'inherit',
              border: `1px solid ${border}`,
              height: '4px',
              width: '100%',
              transition: 'all 1s ease-out',
              '&:hover': {
                minWidth: '256px',
                background: border,
              },
            }}
            key={i}></Box>
        ))}
      </Box>

      <Box layout="flexBoxRow" css={{ position: 'relative', maxWidth: '100%', overflow: 'visible', gap: '$1' }}>
        <AnimatedComponent>
          <BoxMotion
            exit={{ opacity: '0', display: 'none' }}
            css={{
              fill: border,
              justifyContent: 'flex-end',
              stroke: border,
              visibility: selected >= 1 ? 'visible' : 'hidden',
              display: 'flex',
              // padding:'$2',
              alignItems: 'center',
              boxSizing: 'border-box',
              height: '512px',
              cursor: 'pointer',
              overflow: 'visible',
              width: '16px',
              transform: 'translateX(-8px) scale(2)',
              opacity: '0.25',
              // border:`1px solid ${border}`,
              minHeight: '100%',
              borderRadius: '$2',
            }}
            onClick={() => {
              setSelected(selected - 1)
            }}
            key={`prevCard${selected}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" style={{ transform: 'rotate(-180deg)' }} fill="none" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2"></circle>
              <path
                fill="currentColor"
                d="M14 31a1 1 0 100 2v-2zm36.707 1.707a1 1 0 000-1.414l-6.364-6.364a1 1 0 00-1.414 1.414L48.586 32l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM14 33h36v-2H14v2z"></path>
            </svg>
          </BoxMotion>

          {[data.data.find((_: any, i: number) => i === selected)].map((item: ProtocolData, i: number) => {
            return (
              <ProtocolCard
                container={container}
                key={item.refId + 'data'}
                border={border}
                background={background}
                shadow={shadow}
                item={item}
                i={i}
              />
            )
          })}

          {selected < data.data.length - 1 && (
            <BoxMotion
              exit={{ opacity: '0.5', position: '-10000px', display: 'none' }}
              key={`nextCard${selected}`}
              css={{
                fill: border,
                stroke: border,
                display: 'flex',
                // padding:'$2',
                alignItems: 'center',
                boxSizing: 'border-box',
                height: '512px',
                cursor: 'pointer',
                overflow: 'visible',
                width: '32px',
                // border:`1px solid ${border}`,
                minHeight: '100%',
                opacity: '0.25',
                borderRadius: '$2',
              }}
              onClick={() => {
                setSelected(selected + 1)
              }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2"></circle>
                <path
                  fill="currentColor"
                  d="M14 31a1 1 0 100 2v-2zm36.707 1.707a1 1 0 000-1.414l-6.364-6.364a1 1 0 00-1.414 1.414L48.586 32l-5.657 5.657a1 1 0 001.414 1.414l6.364-6.364zM14 33h36v-2H14v2z"></path>
              </svg>
            </BoxMotion>
          )}
        </AnimatedComponent>
      </Box>
    </>
  )
}

export default ProtocolData
