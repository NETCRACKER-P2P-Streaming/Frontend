import React from 'react'
import { Box, Text } from 'grommet'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProfileStreamListItemContainer from "./ProfileStreamListItemContainer"
import Loading from "../../../util_components/Loading"

export default function ProfileStreamsList({ streamsList   }) {
    if (!streamsList) {
        return <Loading />
      }
    return <Box>
        {
            streamsList 
                ? <Box
                  
                >
                      <ProfileStreamListItemContainer
                            key={streamsList.userId}
                            userId={streamsList.userId}
                            streamTitle={streamsList.streamDesc.title}
                            countViewers={streamsList.information.countViewers}
                            streamLinkImage={streamsList.streamDesc.linkImage}
                  
                        />
                </Box>:
                <Text
                color={'brand'}
                alignSelf={'center'}
                margin={'medium'}
                size={'xlarge'}
                weight={'bold'}
            >
                There is nothing here yet :(
            </Text>
            
        }

    </Box>
}

