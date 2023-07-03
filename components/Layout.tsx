import {styled} from '../stiches.config'
import Box from './shared/Box'
import Button from './shared/Button'
import Head from 'next/head'
import { ReactNode} from 'react'
// import Search from '@/design-system/Search'
// import Settings from '@/design-system/Settings'
import {useRouter} from 'next/router'
import {useSetRecoilState, useRecoilState} from 'recoil'
import { minWidthTile, maxWidthTile, SortMethod} from '../contexts/cardSettings'
// import Auth from '@/design-system/Auth'
import Sidebar from  './Sidebar'
import {useThrottle} from '@react-hook/throttle'
import {useRef} from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';

const StyledMain = styled('main', {
    boxSizing: 'border-box',
    height:'100%',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    overflow: 'visible',
    padding: '$0 $4',
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
})

const StyledFooter = styled('footer', {
    padding: '$1 $2',
    backgroundColor: '$background',
    borderRadius: '0',
    fontSize:'$6',
    color:'gray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const StyledHeader = styled('header', {
    position: 'sticky',
    top:'0',
    zIndex:'10',
    backgroundColor: '$background',
    overflow:'hidden',
    color: '$text',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition:'all 0.5s ease-in',
    variants:{
        size:{
            compact:{
                mixBlendMode:'multiply',
                justifyContent: 'center',
                padding: '$2 $4',
                height:'$8',
                backdropFilter:'opacity(0.1)'
            },
            default:{
                padding: '$2 $4',
                height:'$8',
            },
        }
    },
    defaultVariants:{
        size:'default'
    }
})

type PropsLayout = {
    children?: ReactNode;
    isSelected:boolean;
}

type PropsHeader = {
    scrollY:number, 
    children:React.ReactNode,
    scrollDirection:string,
    scrollTransitionValue:number,
    isSelected:boolean
}

const Header = ({scrollY, children, scrollTransitionValue,scrollDirection, isSelected}:PropsHeader) => {
    const router = useRouter()

    if(scrollY<=scrollTransitionValue || scrollDirection === 'top'){
    return(
        <StyledHeader size={'default'}>
                        <Box layout='flexBoxRow' css={{gap:'$1', alignItems:'center'}}>
                                {/* <Auth /> */}
                                <ConnectButton />

                                {/* <Box as={'span'} css={{ color: 'lightgray', userSelect:'none' }}>|</Box> */}
                            {!isSelected && (
                                <>{children}</>
                            )}
                            {isSelected && (
                                <>
                                    <Button
                                        onClick={() => router.push('/')}
                                        css={{ padding: '$0 $1', 
                                        color:'gray',
                                        display:'inline-block', borderRadius:'$round',
                                        '&:hover':{
                                            border:'1px solid $black',
                                            color:'$black'
                                        }
                                        }}
                                        look={"outlined"}>
                                        <svg width="15" 
                                        style={{ position: 'relative', top: '1px' }}
                                        height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                    </Button>
                                </>
                            )}
                        </Box>
                        <Box as='p' css={{color:'gray',userSelect:'none', marginLeft:'$1', textTransform:'uppercase'}}>
                           Nakama
                        </Box>
                        {/* <Search /> */}
               
        </StyledHeader>
        
    )}

    return(
            <StyledHeader size={'compact'}>
                  <Box layout='flexBoxRow' css={{gap:'$1', alignItems:'center'}}>
                        <Box as='p' css={{color:'gray',userSelect:'none', marginLeft:'$1', textTransform:'uppercase'}}>  
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path><path d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </Box>
                  </Box>
            </StyledHeader>
    )
}



const Layout = ({children, isSelected}:PropsLayout) =>{
    const [maxWidth, setMaxWidth] = useRecoilState(maxWidthTile)
    const [minWidth, setMinWidth] = useRecoilState(minWidthTile)
    const setSort = useSetRecoilState(SortMethod)

    const container = useRef(null)
    const [scrollY, setScrollY] = useThrottle(0)
    const [scrollDirection, setScrollDirection] = useThrottle<any>({initialState:'down', fps:1})
    const scrollTransitionValue = 432



    return(
        <Box layout='flexBoxRow' css={{width:'100%',gap:'0', overflow:'hidden'}}>
            <Head>
                <title>NAKAMA</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box 
             onScroll={(e)=>{
                const target = e.target as typeof e.target & {
                    scrollTop:number 
                }
                if(scrollY>target.scrollTop+100){
                    setScrollDirection('top')
                } else if(scrollY<target.scrollTop-100){
                    setScrollDirection('down')
                } 
                setScrollY(target.scrollTop)}}
                ref={container.current}
                css={{height:'100%',
                justifyContent:'space-between',
                position:'relative',
                width:'100%', overflow:'scroll', maxHeight:'100vh', boxSizing:'border-box'}}>
                
                <Header scrollY={scrollY} scrollDirection={scrollDirection} isSelected={isSelected}
                scrollTransitionValue={scrollTransitionValue}>
                                {/* <Settings
                                 setSort={setSort}
                                 setMaxWidth={setMaxWidth}
                                 setMinWidth={setMinWidth}
                                 maxWidth={maxWidth}
                                 minWidth={minWidth}
                                /> */}
                </Header>

                <StyledMain >
                    {children}
                </StyledMain>
                {!isSelected && (
                    <StyledFooter>
                        <span style={{fontSize:'inherit'}}>Nakama</span>
                        <span style={{ fontSize: 'inherit' }}>2023</span>
                    </StyledFooter>
                )}
               
            </Box>
            <Sidebar/>
        </Box>
    )
}

export default Layout