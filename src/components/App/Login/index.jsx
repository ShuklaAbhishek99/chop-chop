import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import Error from "../Error";
import * as Yup from "yup";
import { useFetch } from "@/hooks/useFetch";
import { login } from "@/supabase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState([]);
    const { data, loading, error, fn: loginFn } = useFetch(login, formData);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
    }, [data, error]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                email: Yup.string()
                    .email("Invalid Email!!")
                    .required("Email is required"),

                password: Yup.string()
                    .min(8, "Password must be at least 8 characters long")
                    .matches(
                        /[A-Z]/,
                        "Password must contain at least one uppercase letter"
                    )
                    .matches(/\d/, "Password must contain at least one number")
                    .matches(
                        /[!@#$%^&*(),.?":{}|<>]/,
                        "Password must contain at least one special character"
                    )
                    .required("Password is required"),
            });

            await schema.validate(formData, { abortEarly: false });

            await loginFn();
        } catch (error) {
            const newError = {};

            error?.inner?.forEach((err) => {
                newError[err.path] = err.message;
            });

            setErrors(newError);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    Login to your account if you already have one.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                    />
                    {errors?.email && <Error message={errors.email} />}
                </div>
                <div className="space-y-1">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                    />
                    {errors?.password && <Error message={errors.password} />}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleLogin}>
                    {loading ? <Loader2 className="animate-spin" /> : "Login"}
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Login;
