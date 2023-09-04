import axios from 'axios'
import { useEffect, useState } from 'react'
import BlogSection from '../components/ayuda/BlogSection'
import FirstSection from '../components/ayuda/FirstSection'
import { API_URL, PER_PAGE, QUERY_IMAGE } from '../utils/constants'

const Ayuda = ({ news, pageCount, page, questions }: any) => {
  const [post, setPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await axios.get(`${API_URL}/blogs${QUERY_IMAGE}`)

        setPost(result.data.data)
      } catch (error) {
        console.log('mensaje', error)
      }
    }
    getPost()
  }, [])

  return (
    <div className="space-y-10 py-10 lg:py-10 flex flex-col items-center">
      <FirstSection questions={questions ?? []} />
      <BlogSection
        post={post}
        news={news ?? []}
        pageCount={pageCount}
        page={page}
      />
      <iframe
        src="https://embedsocial.com/facebook_album/pro_hashtag/af880e56c9d1b2eb729d439f442ffb4007404640"
        width="900px"
        height="500px"
        frameBorder="0"
      ></iframe>
    </div>
  )
}

export default Ayuda

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  try {
    const resultBlog = await axios.get(
      `${API_URL}/api/blogs${QUERY_IMAGE}&pagination[page]=${page}&pagination[pageSize]=${PER_PAGE}`
    )
    const resultQuestion = await axios.get(`${API_URL}/api/preguntas`)

    return {
      props: {
        news: resultBlog.data.data,
        pageCount: resultBlog.data.meta.pagination.pageCount,
        questions: resultQuestion.data.data,
        page: +page
      }
    }
  } catch (error) {
    console.log('mensaje', error)
    return {
      props: {}
    }
  }
}
