import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'src/redux/hooks'
import { getDropsInfo, getDropsResults } from 'src/redux/drops/selectors'
import { requestUserDropsInfo } from 'src/redux/drops/actions'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Card } from '../../Card'
import { EmptyState } from 'src/components/organism'

export const DropsTabs = () => {

  const dispatch = useAppDispatch()

  const { drop, isDropsLoading } = useAppSelector(getDropsInfo)
  const results = useAppSelector(getDropsResults)

  const count = drop?.next.split('?')[1] || 'limit=10&offset=0'
  
  console.log('count', count)

  const loadMoreData = () => {
    if (isDropsLoading) {
      return
    }
    dispatch(requestUserDropsInfo(count))
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <div id="scrollableDiv">
        <InfiniteScroll
            className="scroll"
            dataLength={results.length}
            next={loadMoreData}
            hasMore={true}
            loader={<div className="loading">Loading...</div>}
        >
            <div className='card-display'>
            {
                drop?.count ? ( results.map((drop) => 
                <Card pack_artwork={''} title={drop.drop.title} price={drop.drop.price} />)
                ) : (
                <EmptyState children description='Once you list your moments for sale, they will appear here.' />
                )
            }
            </div>
        </InfiniteScroll>
    </div>
  )
}
