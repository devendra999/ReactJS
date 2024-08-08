import { Button } from '@mui/material'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1>Hello</h1>
      <Link href="/users"><Button variant="contained">Go to users</Button></Link>
    </>
  )
}
