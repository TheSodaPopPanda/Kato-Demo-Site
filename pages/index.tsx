import { NextPage } from 'next'
import Head from 'next/head'
import { FormEvent, useEffect, useState } from 'react'

const homePage: NextPage = () => {
  const [state, setState] = useState<any>({
    blogPosts: [],
    customContent: [],
    form: {
      subject: '',
      details: ''
    }
  })

  useEffect(() => {
    const _run = async () => {
      const newState = {
        blogPosts: [],
        customContent: []
      }
      await fetch('https://api.kato.studio/api/v1/blog/posts?site=kato.demo.site&count=20&offset=0')
        .then(response => response.json())
        .then(posts => {
          newState.blogPosts = posts
        })
        .catch((err) => { console.error(err) })
      await fetch('https://api.kato.studio/api/v1/content?site=kato.demo.site&count=20&offset=0')
        .then(response => response.json())
        .then(data => {
          newState.customContent = data
        })
        .catch((err) => { console.error(err) })

      setState({
        ...state,
        ...newState
      })
    }
    _run()
  }, [])

  return <div>
    <Head>
      <title>Kato CMS Demo Site</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="description" content="..."/>
      {/* Social Embed */}
      <meta property="og:title" content='Kato CMS Demo Site'/>
      <meta property="og:description" content='...'/>
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content='/social_image.jpg' /> */}
      {/* <meta property="og:url" content='https://example.com/'/> */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="og:site_name" content="Kato CMS Demo Site"/>
    </Head>
    <div className='bg-theme-main-bg'>
      <div className="min-h-screen h-full flex flex-col w-full">
          <h1 className='font-bold pb-20 px-4 pt-32 text-center text-4xl md:text-6xl text-theme-text-main drop-shadow-sm'>
            Kato CMS Demo Site
          </h1>
          <div className='max-w-[1000px] w-full mx-auto'>
          <div>
            <p className='font-semibold text-4xl text-theme-text-main'>Test Blog Posts Fetch</p>
            <div className='pt-4 pb-10 px-4'>
              {
                state.blogPosts && state.blogPosts.length > 0
                  ? state.blogPosts.map((ele:any, index:number) => {
                    return <a
                    target='_blank'
                    rel="noreferrer"
                    href={'https://api.kato.studio/api/v1/blog/posts?id=' + ele._id + '&site=' + ele.site}
                    key={'blogPosts' + index}
                    className='block bg-theme-accent-bg rounded-md shadow-lg'
                  >
                    <p className='font-normal p-1 px-3 text-2xl border-2 border-theme-accent-bg/0 hover:border-theme-accent-bg rounded-md text-theme-text-alt'>
                      id:&nbsp;&nbsp;<span className='font-mono underline'>{ele._id}</span>
                      <br/>
                      title:&nbsp;&nbsp;<span className='font-mono underline'>{ele.title}</span>
                    </p>
                  </a>
                  })
                  : <div>
                    <p className='font-medium text-2xl py-8 text-center text-theme-text-main/50'>No Blog Posts Found</p>
                </div>
              }
            </div>
          </div>
          <div>
            <p className='font-semibold text-4xl text-theme-text-main'>Test Custom Content Fetch</p>
            <div className='pt-4 pb-10 px-4'>
              {
                state.customContent && state.customContent.length > 0
                  ? state.customContent.map((ele:any, index:number) => {
                    return <a
                    target='_blank'
                    rel="noreferrer"
                    href={'https://api.kato.studio/api/v1/content?id=' + ele._id + '&site=' + ele.site}
                    key={'customContent' + index}
                    className='block bg-theme-accent-bg rounded-md shadow-lg'
                  >
                    <p className='font-normal p-1 px-3 text-2xl border-2 border-theme-accent-bg/0 hover:border-theme-accent-bg rounded-md text-theme-text-alt'>
                      id:&nbsp;&nbsp;<span className='font-mono underline'>{ele._id}</span>
                      <br/>
                      content type:&nbsp;&nbsp;<span className='font-mono underline'>{ele.content_type}</span>
                    </p>
                  </a>
                  })
                  : <div>
                    <p className='font-bold text-2xl py-8 text-center text-theme-text-main/50'>No Custom Content Found</p>
                </div>
              }
            </div>
          </div>
          <div>
            <p className='font-semibold text-4xl text-theme-text-main'>Test Form Submission</p>
            <div className='flex flex-col w-[20rem] mx-auto mt-12'>
              <input
                name='subject'
                className='w-[20rem] rounded-sm p-2'
                value={state.form.subject}
                onChange={(e:FormEvent<HTMLInputElement>) => setState({
                  ...state,
                  form: {
                    ...state.form,
                    subject: e.currentTarget.value
                  }
                })}
                placeholder='subject'
              />
              <textarea
                name='details'
                className='w-[20rem] h-[6rem] rounded-sm mt-6 p-2'
                value={state.form.details}
                onChange={(e:FormEvent<HTMLTextAreaElement>) => setState({
                  ...state,
                  form: {
                    ...state.form,
                    details: e.currentTarget.value
                  }
                })}
                placeholder='details'
              />
               <button
                className='w-[20rem] rounded-sm font-semibold text-theme-text-main hover:bg-theme-accent-dark bg-theme-accent py-2 px-5 mt-6'
                onClick={(e:any) => {
                  e.preventDefault()
                  if (state.name !== '' && state.email !== '') {
                    fetch('https://api.kato.studio/api/v1/forms?site=kato.demo.site&form=test_form', {
                      method: 'post',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        data: {
                          ...state.form
                        }
                      })
                    })
                      .then(response => response.json())
                      .then((res) => {
                        alert('send')
                        console.log(res)
                      })
                      .catch((err) => { console.error(err) })
                  } else {
                    alert('one or more fields are empty')
                  }
                }}
              >
                Submit Form
              </button>
            </div>
          </div>
      </div>
      </div>
      <div
        className='fixed bottom-2 left-2 p-3 rounded bg-theme-accent-bg'
      >
        <p className='font-semibold text-lg pb-2'>Kato CMS Login</p>
        <p>
          <span className='font-semibold'>Email:&nbsp;&nbsp;</span>demo@kato.studio
        </p>
        <p>
          <span className='font-semibold'>Password:&nbsp;&nbsp;</span>demo12345678
        </p>
        <p className='pt-2 pb-1'>
          <a
            className='underline font-medium text-theme-accent hover:text-theme-accent-dark'
            href="https://dashboard.kato.studio/login"
            target="_blank"
            rel="noopener noreferrer"
          >Kato CMS Link</a>
        </p>
      </div>
    </div>
  </div>
}

export default homePage
