/* @flow */

import React, { Fragment, type ComponentType } from 'react'
// import { SyntheticInputEvent } from 'react-dom'
import { Observable, ConnectableObservable, Subject } from 'rxjs'
import styled from 'styled-jss'

/* :: declare var lifecycle: (Object) => <V>(V) => V */

import {
  compose,
  withProps,
  // $FlowFixMe
  lifecycle,
  mapPropsStream,
  // $FlowFixMe
  setObservableConfig,
} from 'recompose'

import rxjsconfig from 'recompose/rxjsObservableConfig'

import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

import {
  client,
  users as usersAPI,
  type User,
  type APIResponse,
  type $AxiosXHR,
} from './api'

import { UserList } from './components/UserList'

const Actions = withProps(({ goBack, goNext }) => ({
  children: (
    <Fragment>
      {goBack && <Button onClick={goBack}>Previous page</Button>}
      {goNext && <Button onClick={goNext}>Next page</Button>}
    </Fragment>
  ),
}))(styled(CardActions)({
  display: 'flex',
  justifyContent: ({ goBack, goNext }) => (
    !goBack && goNext ? 'flex-end' : 'space-between'
  ),
}))

setObservableConfig(rxjsconfig)

type DataStatus = 'mounted' | 'loading' | 'loaded' | 'fail'

const BotUsersWrapper = styled(Card)({
  margin: ['1em', 'auto'],
  maxWidth: '30em',
})

export const BotUsers: ComponentType<{}> = compose(
  mapPropsStream(() => {
    const data$: Subject<APIResponse<User[]>> = new Subject()
    const dataStatus$: Subject<DataStatus> = new Subject()
    const searchUsers$: Subject<string> = new Subject()
    const getUsers$: Subject<void> = new Subject()
    const go$: Subject<string> = new Subject()

    const statusUpdate = (newStatus: DataStatus) => { dataStatus$.next(newStatus) }
    const dataUpdate = (newData: APIResponse<User[]>) => { data$.next(newData) }
    const searchUsers = (e: SyntheticInputEvent<*>) => { searchUsers$.next(e.target.value) }
    const getUsers = () => { getUsers$.next() }
    const go = (url: string) => { go$.next(url) }

    const userResponse$: ConnectableObservable<void | $AxiosXHR<APIResponse<User[]>>> =
      Observable.merge(
        go$
          .do(() => statusUpdate('loading'))
          .debounceTime(1500)
          .mergeMap(url => client.get(url).catch(console.error)),
        Observable.merge(getUsers$, searchUsers$)
          .do(() => statusUpdate('loading'))
          .debounceTime(1500)
          .mergeMap(name => usersAPI
            .get(name ? { name } : undefined)
            .catch(console.error)),
      )
        .publish()

    userResponse$.connect()

    userResponse$
      .filter(response => !response)
      .subscribe(() => statusUpdate('fail'))

    userResponse$
      .mergeMap(response => (
        response ?
          Observable.of(response) :
          Observable.empty()
      ))
      .map(response => response.data)
      .do(() => statusUpdate('loaded'))
      .subscribe(dataUpdate)

    return Observable.combineLatest(
      dataStatus$.startWith('mounted'),
      data$.startWith({ result: [] }),
      (dataStatus, data) => {
        const { previousPageUrl, nextPageUrl, result } = data

        return {
          users: result,
          loading: dataStatus === 'loading',
          searchUsers,
          getUsers,
          goBack: previousPageUrl && (() => go(previousPageUrl)),
          goNext: nextPageUrl && (() => go(nextPageUrl)),
        }
      },
    )
  }),
  lifecycle({
    componentDidMount() {
      if (!this.props.users.length) this.props.getUsers()
    },
  }),
)(({ loading, users, goBack, goNext, searchUsers }) => (
  <BotUsersWrapper>
    <CardHeader title='Bot users' />
    <CardContent>
      <TextField fullWidth label='Filter users by name' onChange={searchUsers} />
    </CardContent>
    {(goBack || goNext) && <Actions goBack={goBack} goNext={goNext} />}
    <CardContent>
      <UserList loading={loading} users={users} />
    </CardContent>
  </BotUsersWrapper>
))
