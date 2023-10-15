'use client'
import { Container, Toast, Card } from 'react-bootstrap'
import QuestionCard from '@/component/app.card.simple'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import HTMLReactParser from 'html-react-parser';
import './globals.css'

export default function Home() {
  const [isLogin, setIsLogin] = useState('')
  useEffect(() => {
    let isLogin = localStorage.getItem('isLogin')
    setIsLogin(isLogin !== 'true' ? 'false' : isLogin)
  }, [])

  const [questions, updateQuestion] = useState([
    {
      avatarSrc: 'Brand.jpg',
      authorName: 'Alice Johnson',
      questionDate: '10/10/2023',
      tags: ['React', 'Web Development'],
      questionTitle: 'How to Optimize React Application Performance?',
      answersCount: 15,
      viewsCount: 237,
      bookmarksCount: 58,
    }, {
      avatarSrc: 'Brand.jpg',
      authorName: 'Alice Johnson',
      questionDate: '10/10/2023',
      tags: ['React', 'Web Development'],
      questionTitle: 'How to Optimize React Application Performance?',
      answersCount: 12,
      viewsCount: 12,
      bookmarksCount: 5128,
    },
  ])
  var temp1 = [
    {
      avatarSrc: 'Brand.jpg',
      authorName: 'Alice Johnson',
      questionDate: '10/10/2023',
      tags: ['fhg', 'Development'],
      questionTitle: 'HX ReXXXXXXXXXXXXact Application XXXXXXXXXXXXXXXXXXXXXXXXXXXXX?',
      answersCount: 15123312,
      viewsCount: 231231327,
      bookmarksCount: 58123123,
    }, {
      avatarSrc: 'Brand.jpg',
      authorName: 'AlixXXXXce JohnsXXXXon',
      questionDate: '10/10/2XXXX023',
      tags: ['React', 'Web DeveloXXXpment'],
      questionTitle: 'How toXXXXXXXXXXXXXXXXXXX Optimize React Application Performance?',
      answersCount: 12132,
      viewsCount: 1322312,
      bookmarksCount: 5121231233121238,
    },
  ]
  var temp2 = [
    {
      avatarSrc: 'Brand.jpg',
      authorName: 'Alice Johnson',
      questionDate: '10/10/2023',
      tags: ['React', 'Web Development'],
      questionTitle: 'How to Optimize React Application Performance?',
      answersCount: 15,
      viewsCount: 237,
      bookmarksCount: 58,
    }, {
      avatarSrc: 'Brand.jpg',
      authorName: 'Alice Johnson',
      questionDate: '10/10/2023',
      tags: ['React', 'Web Development'],
      questionTitle: 'How to Optimize React Application Performance?',
      answersCount: 12,
      viewsCount: 12,
      bookmarksCount: 5128,
    },
  ]
  function handleChange(event: any, page: number) {
    var temp: any = page % 2 == 0 ? temp1 : temp2
    console.log(temp);
    updateQuestion(temp)
  }

  return (
    <Container>
      {questions.map((question, index) => (
        <QuestionCard
          key={index}
          avatarSrc={question.avatarSrc}
          authorName={question.authorName}
          questionDate={question.questionDate}
          tags={question.tags}
          questionTitle={question.questionTitle}
          answersCount={question.answersCount}
          viewsCount={question.viewsCount}
          bookmarksCount={question.bookmarksCount}
        />
      ))}
      <Pagination count={11} onChange={handleChange} variant="outlined" color="primary" size="large" className='d-flex justify-content-center' />
    </Container>
  )
}
