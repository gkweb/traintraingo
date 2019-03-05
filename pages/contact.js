import styled from 'styled-components'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import NextSeo from 'next-seo'
import Router from 'next/router'
// import Header from './../components/header'
import {Main, PageContainer} from './../components/layout'
import {P as Blurb, H1 as Title} from './../components/text'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const FieldStyled = styled((props) => (<Field {...props}></Field>))`
box-sizing: border-box;
display: block;
width: 100%;
padding: .75em;
border: 2px solid white;
color: white;
background-color: black;
font-size: 1.5em;

:focus {
  border-color: #71b280;
  outline: 0;
  box-shadow: #fff -1px 0 10px;
}
`

const TextAreaStyled = styled((props) => (<Field {...props} component="textarea"></Field>))`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: .75em;
  border: 2px solid white;
  color: white;
  background-color: black;
  font-size: 1.5em;

  :focus {
    border-color: #71b280;
    outline: 0;
    box-shadow: #fff -1px 0 10px;
  }
`

const Button = styled.button`
  display: block;
  padding: .75em;
  margin-bottom: 1em;
  margin-left: auto;
  font-size: 1.5em;
  background-color: #71b280;
  border: 0;
  color: black;

  &:hover,
  &:focus {
    background-color: #134e5e;
  }

  &:focus {
    outline: none;
    box-shadow: #fff -1px 0 10px;
  }
  
`

const Error = styled.p`
  display: inline-block;
  padding: .25em 1em;
  margin: -2px 0 0 0;
  color: black;
  background-color: #f46036;
`

const InputContainer = styled.div`
  width: 100%;
  max-width: 30em;
  margin: 0 auto;
`

const InputControlElem = styled.div`
  margin: 0 0 1em 0;

  > label {
    color: white;
  }
`

const FormStyled = styled((props) => (<Form {...props}></Form>))`
  display: block;
  width: 100%;
`

const InputControl = (props) => (
  <InputControlElem>
    <label htmlFor={props.id}>{props.children}</label>
    <FieldStyled id={props.id} name={props.name} type={props.type} aria-describedby={`error-${props.id}`}/>
    <div role="alert" id={`error-${props.id}`}>
      { props.error && props.error.length > 0 ? (<Error>Error: { props.error }</Error>) : ''}
    </div>
  </InputControlElem>
)

const TextAreaControl = (props) => (
  <InputControlElem>  
    <label htmlFor={props.id}>{props.children}</label>
    <TextAreaStyled id={props.id} name={props.name} aria-describedby={`error-${props.id}`}/>
    <div role="alert" id={`error-${props.id}`}>
      { props.error && props.error.length > 0 ? (<Error>Error: { props.error }</Error>) : ''}
    </div>
  </InputControlElem>
)

const ContactSchema = Yup.object().shape({
  contact_name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Name is a required field'),
  contact_email: Yup.string()
    .email('Invalid email')
    .required('Email is a required field'),
  contact_msg: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Message is a required field')
})

export default () => <PageContainer>
  <NextSeo
    config={{
      title: 'Contact Glade Kettle - Front End Developer Melbourne, Australia',
      description: 'HTML, CSS, Javascript, GIT'
    }}
  />
  <Header></Header>
  <Main>
    <Title>Contact</Title>
    <Blurb>Leave me a message with any questions or add me on Linkedin</Blurb>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{ contact_name: '', contact_email: '', contact_msg: '' }}
      validationSchema={ContactSchema} 
      onSubmit={(values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": 'contact',
            ...values
          })
        })
        .then(() => (Router.push('/thankyou')))
        .catch(error => alert(error));
      }}

      render={(props) => {
        const {
          isSubmitting,
          isValidating,
          errors,
          handleChange,
          handleSubmit
        } = props

        return (
        <FormStyled onSubmit={handleSubmit} data-netlify="true" data-netlify-honeypot="bot-field" name="contact">
          <InputContainer>
            <InputControl type="text" id="contact_name" name="contact_name" error={errors.contact_name ? errors.contact_name : null} required isValidating={isValidating}>Name</InputControl>
            <InputControl type="email" id="contact_email" name="contact_email" error={errors.contact_email ? errors.contact_email : null} required isValidating={isValidating}>Email</InputControl>
            <TextAreaControl id="contact_msg" name="contact_msg" error={errors.contact_msg ? errors.contact_msg : null} required isValidating={isValidating}>Message</TextAreaControl>
            <div>
              <Button onClick={handleSubmit} type="submit">Submit</Button>
            </div>
          </InputContainer>
        </FormStyled>
      )}}
    />
  </Main>
  </PageContainer>
