import React from 'react'
import { IconButton, Container } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';




export default function Footer() {
  const styles = {
    icon: {
      color: "wheat",
      padding: "20px",
      display: "inline",
    },
    container: {
      marginTop: "10vh",
      textAlign: "center",
    },
    link: {
      underline: "none",
      textDecoration: "none",
      color: "wheat",
    },
    footer: {
      fontSize: "1.5rem",
      padding: "30px",
    }
  }
  const links = [
    {
      href: '',
      icon: () => <MailOutlineIcon />
    },
    {
      href: '',
      icon: () => <GitHubIcon onClick={() => window.open('https://github.com/')}/>
    },
    {
      href: '',
      icon: () => <LinkedInIcon onClick={() => window.open('https://linkedin.com/')}/>
    },
    {
      href: '',
      icon: () => <FacebookIcon onClick={() => window.open('https://facebook.com/')}/>
    }
  ]

  return (
    <Container style={styles.container}>
      {links.map((link, i) => (
        <div style={styles.icon}>
          <IconButton key={i} color="secondary" href={link.href} size="large" rel="noreferrer" className='SvgIcon'>
            {link.icon()}
          </IconButton>
        </div>
      ))
      }
      <div style={styles.footer}>
        <p>Updated July 2023</p>
        2023 © <br />
        Powered by <a href="" target="_blank" rel="noopener noreferrer" style={styles.link}>Title</a>
      </div>
    </Container >
  )
}
