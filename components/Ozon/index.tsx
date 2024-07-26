import React, {MouseEventHandler, useEffect, useState} from 'react';
import {NextPage} from "next";
import Cookies from 'js-cookie';
import styles from './Ozon.module.scss';
import clsx from "clsx";
import {Formik, Form, Field, FormikHelpers} from 'formik';
import {log} from "util";



const directions = [{name: "seller", title: "Селлер"}, {name: "uzenka", title: "Уценка"}, {name: "hrg", title: "ХРГ"}, {name: "hrgng", title: "ХРГ-НГ"}, {name: "hrgUzenka", title: "ХРГ(Уценка)"}, {name: "podmen", title: "Подмены"}, {name: "retail", title: "Retail"}];

export const Ozon: NextPage = () => {

    const [summary, setSummary] = useState(0);
    const [summaryValid, setSummaryValid] = useState(0);

    const [selectedValue, setSelectedValue] = useState("0");


    const [containers, setContainer] = useState([]);

    const [active, setActive] = useState(0);


    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    }

    // const testObj = [{count: 80, status: false, history: [80]}];

    // Cookies.set("containers", JSON.stringify(testObj), { path: "" });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cookieValue = Cookies.get('norm');
            setSelectedValue(cookieValue || "0");
        }
    }, []);

    useEffect(() => {
        Cookies.remove('norm', { path: '' });
        Cookies.set("norm", selectedValue, { path: "" });
    }, [selectedValue]);




    const calculateSummary = (values) => {
        const seller = parseFloat(values.seller) || 0;
        const uzenka = parseFloat(values.uzenka) || 0;
        const hrg = parseFloat(values.hrg) || 0;
        const hrgng = parseFloat(values.hrgng) || 0;
        const hrgUzenka = parseFloat(values.hrgUzenka) || 0;
        const podmen = parseFloat(values.podmen) || 0;
        const retail = parseFloat(values.retail) || 0;

        const newSummary = seller + uzenka + hrg + hrgng+ hrgUzenka + podmen + retail;


        setSummary(newSummary);

    };
    const calculateValid = (values) => {
        const hrg = parseFloat(values.hrg) || 0;
        const hrgng = parseFloat(values.hrgng) || 0;
        const hrgUzenka = parseFloat(values.hrgUzenka) || 0;

        const newSummary = hrg + hrgUzenka + hrgng;

        setSummaryValid(newSummary);
    };

    useEffect(() => {
        const seller = Cookies.get('seller') || '0';
        const uzenka = Cookies.get('uzenka') || '0';
        const hrg = Cookies.get('hrg') || '0';
        const hrgng = Cookies.get('hrgng') || '0';
        const hrgUzenka = Cookies.get('hrgUzenka') || '0';
        const podmen = Cookies.get('podmen') || '0';
        const retail = Cookies.get('retail') || '0';


        if(Cookies.get("containers")){
            const cookieCont = JSON.parse(Cookies.get("containers")) || [];
            setContainer(cookieCont);
        }

        const initialValues = { seller, uzenka, hrg, hrgng, hrgUzenka, podmen, retail };
        calculateSummary(initialValues);
        calculateValid(initialValues);
    }, []);


    const createContainer = () => {
        const newContainer = {count: 0, closed: false, problems: false, history: []};
        setContainer((prevState) => {
            const newContainers = [...prevState, newContainer];
            Cookies.set("containers", JSON.stringify(newContainers), { path: "" });
            return newContainers;
        });
    };

    const chooseContainer = (index: number): MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            setActive(index);
        };
    }

    const containersSum = (containers) => {
        return containers.reduce((sum, current) => {
            return sum + current.count;
        }, 0);
    }


    const editHistory = (array, count) => {
        // if(array.length >= 10){
        //     array.shift();
        // }
        // if(array.at(-1) && array.at(-1) <= count){
        //     return array;
        // }
        array.push(count);
        return array;
    }


    const addItems = (index: number): MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            setContainer((prevContainers) => {
                const newContainers = [...prevContainers];
                let contSum = containersSum(newContainers)
                let slack = summaryValid - contSum;
                if(slack < 0){
                    alert("Неверные значения");
                    return  prevContainers;
                }
                newContainers[index].count += slack;
                newContainers[index].history = editHistory(newContainers[index].history, newContainers[index].count);
                Cookies.set("containers", JSON.stringify(newContainers), { path: "" });
                return newContainers;
            });
        };
    }
    const changeItems = (count: string, curIndex: number, tarIndex: number) => {
            setContainer((prevContainers) => {
                const newContainers = [...prevContainers];
                newContainers[curIndex].count -= parseFloat(count);
                newContainers[tarIndex - 1].count += parseFloat(count);
                newContainers[curIndex].history = editHistory(newContainers[curIndex].history, newContainers[curIndex].count);
                newContainers[tarIndex - 1].history = editHistory(newContainers[tarIndex - 1].history, newContainers[tarIndex - 1].count);
                Cookies.set("containers", JSON.stringify(newContainers), {path: ""});
                return newContainers;
            });
    }

    const closeContainer = (index: number): MouseEventHandler<HTMLDivElement> => {
        return (event) => {
            setContainer((prevContainers) => {
                const newContainers = [...prevContainers];
                newContainers[index].closed = !newContainers[index].closed;
                Cookies.set("containers", JSON.stringify(newContainers), { path: "" });
                return newContainers;
            });
        };
    }

    return (
        <div className={clsx("wrapper", styles.container)}>
            <section className={clsx(styles.summary)}>
                <div className={clsx("d-flex justify-content-between align-items-center", styles.header__summary)}>
                    <h2 style={{color: `${summary && summary >= parseFloat(selectedValue) ? "green" : ""}`}}>Сумма: {summary} (валид: {summaryValid})</h2>
                    <div>
                        {selectedValue !== "0" ? <p>Норма: {selectedValue}</p> : <div>
                            <span>Выбрать норму:</span>
                            <select name="norm" id="norm" onChange={handleChange} value={selectedValue}>
                                <option>Выбрать норму</option>
                                <option value="150">150</option>
                                <option value="300">300</option>
                            </select>
                        </div>}
                    </div>
                </div>
                <div className={clsx(styles.progress)}>
                    <div className={clsx(styles.progress_inner)} style={{width: `${summary < parseFloat(selectedValue) ? (summary * 100) / parseFloat(selectedValue) : 100}%`, backgroundColor: `${summary && summary >= parseFloat(selectedValue) ? "green" : ""}`}}>{summary && parseFloat(selectedValue) ? Math.floor((summary * 100) / parseFloat(selectedValue)) : 0}%</div>
                    <p className={clsx(styles.progress_rest)}>{(parseFloat(selectedValue) - summary) > 0 ? (parseFloat(selectedValue) - summary) : 0}</p>
                </div>
                <div className={clsx(styles.directions)}>
                    <Formik
                        initialValues={{
                            seller: Cookies.get('seller') || '0',
                            uzenka: Cookies.get('uzenka') || '0',
                            hrg: Cookies.get('hrg') || '0',
                            hrgng: Cookies.get('hrgng') || '0',
                            hrgUzenka: Cookies.get('hrgUzenka') || '0',
                            podmen: Cookies.get('podmen') || '0',
                            retail: Cookies.get('retail') || '0',
                        }}
                        onSubmit={(
                            values: { seller: string, uzenka: string, hrg: string, hrgng: string, hrgUzenka: string, podmen: string, retail: string },
                            { setSubmitting }: FormikHelpers<{ seller: string, uzenka: string, hrg: string, hrgng: string,  hrgUzenka: string, podmen: string, retail: string }>
                        ) => {
                            const initialValues = { seller: values.seller, uzenka: values.uzenka, hrg: values.hrg, hrgng: values.hrgng, hrgUzenka: values.hrgUzenka, podmen: values.podmen, retail: values.retail };
                            calculateSummary(initialValues);
                            calculateValid(initialValues);
                        }}
                    >
                        {({ values , handleChange, handleSubmit}) => (
                            <Form className={clsx(styles.directions)}>
                                {directions.map(direction => (
                                    <div key={direction.name} className={clsx(styles.direction)}>
                                        <div className={clsx("d-flex")} style={{height: "100%"}}>
                                            <div className={clsx(styles.direction_sum)}>
                                                <Field
                                                    type="text"
                                                    name={direction.name}
                                                    value={values[direction.name]}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        const { value } = e.target;
                                                        if(value !== "0"){
                                                            Cookies.set(direction.name, value, { path: "" });
                                                            handleSubmit();
                                                        }
                                                    }}
                                                    onBlur={(e) => {
                                                        handleChange(e);
                                                        const { value } = e.target;
                                                        if(value === "0"){
                                                            Cookies.set(direction.name, value, { path: "" });
                                                            handleSubmit();
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className={clsx(styles.direction_sum_title)}>
                                                <p>{direction.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Form>
                    )}</Formik>
                </div>
            </section>
            <section className={clsx(styles.containers)}>
                <h2>Тары <span style={{color: `${summaryValid < containersSum(containers) || summaryValid > containersSum(containers) ? "red" : ""}`}}>{containersSum(containers)}</span></h2>
                <button onClick={createContainer}>
                    Создать новую тару
                </button>
                <div className={clsx(styles.containers_box)}>
                    {containers.map((container, index) =>
                            <div
                                key={index}
                                className={clsx(styles.container_box, active === index ? styles.active : null)}
                                onClick={chooseContainer(index)}>
                                <div className={clsx(styles.active_title)}>
                                    <div className={clsx(styles.container_index)}>{index + 1}</div>
                                    {active === index && (
                                        <div onClick={addItems(index)} className={clsx(styles.container_status)}>Добавить</div>
                                    )}
                                    {/*{container.closed && <div className={clsx(styles.container_status)}>Закрыта</div>}*/}
                                </div>
                                    <p className={clsx(styles.container_box_count)}>{container.count >= 0 ? container.count : 0}</p>
                                <Formik
                                    initialValues={{
                                        count: "5",
                                        index: index + 2
                                    }}
                                    onSubmit={(
                                        values: { count: string, index: number },
                                        { setSubmitting }: FormikHelpers<{ count: string, index: number }>
                                    ) => {
                                        if(parseFloat(values.count) && values.index && container.count > 0 && parseFloat(values.count) <= container.count && values.index <= containers.length){
                                            changeItems(values.count, index, values.index);
                                        } else {
                                            alert("Неверные значения")
                                        }
                                    }}
                                >
                                    {({ values , handleChange, handleSubmit}) => (
                                        <Form>
                                            <Field
                                                type="text"
                                                name="count"
                                                value={values.count}
                                                onBlur={(e) => {
                                                    handleChange(e);
                                                    const { value } = e.target;
                                                    if(value === "0"){
                                                        handleSubmit();
                                                    }
                                                }}
                                            />
                                            <Field
                                                type="text"
                                                name="index"
                                                value={values.index}
                                                onBlur={(e) => {
                                                    handleChange(e);
                                                    const { value } = e.target;
                                                    if(value === "0"){
                                                        handleSubmit();
                                                    }
                                                }}
                                            />
                                            <button type="submit">Перенести</button>
                                        </Form>
                                    )}</Formik>
                                <div className={clsx(styles.container_box_history)}>{container.history.map((item) => `${item} `)}</div>
                                {/*<button>Пометить</button>*/}
                                {/*<button onClick={() => closeContainer(index)}>Закрыть</button>*/}
                            </div>
                    )}
                </div>

            </section>
        </div>
    )
};
