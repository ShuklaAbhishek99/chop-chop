import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUrlState } from "@/context/useUrlState";
import { useNavigate, useSearchParams } from "react-router-dom";
import Error from "../Error";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { QRCode } from "react-qrcode-logo";
import { useFetch } from "@/hooks/useFetch";
import { createUrl } from "@/supabase/db/urls";
import { Loader2 } from "lucide-react";

function CreateLink({ name }) {
    const { user } = useUrlState();
    const navigate = useNavigate();
    const qrRef = useRef();
    const [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        longUrl: longLink ? longLink : "",
        customUrl: "",
        description: "",
    });

    const schema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        longUrl: Yup.string()
            .url("Must be a valid URL")
            .required("Long URL is required"),
        customUrl: Yup.string(),
        description: Yup.string(),
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const {
        data: createUrlData,
        loading: createUrlLoading,
        error: createUrlError,
        fn: createUrlFn,
    } = useFetch(createUrl, { ...formData, user_id: user?.id });

    useEffect(() => {
        if (createUrlError === null && createUrlData) {
            navigate(`/link/${createUrlData[0]?.id}`);
        }
    }, [createUrlError, createUrlData]);

    const createLink = async () => {
        setErrors([]);

        try {
            await schema.validate(formData, { abortEarly: false });

            const canvas = qrRef?.current?.canvasRef?.current;
            const blob = await new Promise((resolve) => canvas?.toBlob(resolve));

            await createUrlFn(blob);
        } catch (error) {
            const newErrors = {};

            error?.inner?.forEach((err) => {
                newErrors[err.path] = err?.message;
            });

            setErrors(newErrors);
        }
    };

    return (
        <Dialog
            defaultOpen={longLink}
            onOpenChange={(res) => {
                if (!res) {
                    setSearchParams({});
                }
            }}
        >
            <DialogTrigger>
                <Button>{name}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Creat New Link?</DialogTitle>
                </DialogHeader>
                <div className="mx-auto">
                    {formData?.longUrl && (
                        <QRCode
                            value={formData?.longUrl}
                            size={250}
                            ref={qrRef}
                            logoImage="/Logo.png"
                        />
                    )}
                </div>

                <Input
                    id="title"
                    name="title"
                    placeholder="Short link's title"
                    value={formData?.title}
                    onChange={handleInputChange}
                />
                {errors?.title && <Error message={errors?.title} />}
                <Input
                    id="longUrl"
                    name="longUrl"
                    placeholder="Looong link"
                    value={formData?.longUrl}
                    onChange={handleInputChange}
                />
                {errors?.longUrl && <Error message={errors?.longUrl} />}
                <div className="flex items-center gap-2">
                    <Card className="p-2">{import.meta.env.VITE_SITE_URL}</Card>
                    /
                    <Input
                        id="customUrl"
                        name="customUrl"
                        placeholder="Custom link (optional)"
                        value={formData?.customUrl}
                        onChange={handleInputChange}
                    />
                </div>
                <Input
                    id="description"
                    name="description"
                    placeholder="Description (optional)"
                    value={formData?.description}
                    onChange={handleInputChange}
                />
                {errors?.message && <Error message={errors?.message} />}

                <DialogFooter className="sm:justify-start">
                    <Button
                        type="button"
                        onClick={createLink}
                        disabled={createUrlLoading}
                    >
                        {createUrlLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreateLink;
