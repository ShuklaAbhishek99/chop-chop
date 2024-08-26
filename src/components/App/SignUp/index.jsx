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
import { signUp } from "@/supabase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUrlState } from "@/context/useUrlState";
import { Label } from "@radix-ui/react-dropdown-menu";

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        profile_avatar: null,
    });
    const [errors, setErrors] = useState([]);
    const { data, loading, error, fn: signUpFn } = useFetch(signUp, formData);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const { fetchUser } = useUrlState();

    useEffect(() => {
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);

            fetchUser();
        }
    }, [data, error]);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;

        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSignUp = async () => {
        setErrors([]);

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required("Name is required"),
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
                profile_avatar: Yup.mixed().required(
                    "Profile picture is required"
                ),
            });

            await schema.validate(formData, { abortEarly: false });

            await signUpFn();
        } catch (error) {
            const newError = {};

            error?.inner?.forEach((err) => {
                newError[err?.path] = err?.message;
            });

            setErrors(newError);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Input
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        onChange={handleInputChange}
                    />
                </div>
                {errors?.name && <Error message={errors?.name} />}
                <div className="space-y-1">
                    <Input
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        onChange={handleInputChange}
                    />
                </div>
                {errors?.email && <Error message={errors?.email} />}
                <div className="space-y-1">
                    <Input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="space-y-1">
                    <Label
                        htmlFor="profile_avatar"
                        className="font-bold text-sm"
                    >
                        Profile picture
                    </Label>
                    <Input
                        id="profile_avatar"
                        name="profile_avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleInputChange}
                    />
                </div>
                {errors?.profile_avatar && <Error message={errors?.profile_avatar} />}
                {error && <Error message={error?.message} />}
            </CardContent>
            <CardFooter>
                <Button onClick={handleSignUp}>
                    {loading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        "Create account"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}
