'use client'
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
const Profile = () => {
    const router = useRouter();
    const handleClick = () => {
        router.push("/")
    }
    return (
        <Button variant="primary" onClick={handleClick}>Click me</Button>
    )
}

export default Profile