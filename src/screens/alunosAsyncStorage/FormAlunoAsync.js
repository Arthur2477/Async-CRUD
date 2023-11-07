import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormAlunoAsync({ navigation, route }) {

    const { acao, aluno: alunoOld } = route.params

    const [nome, setNome] = useState('')
    const [matricula, setmatricula] = useState('')
    const [curso, setcurso] = useState('')
    const [turno, setturno] = useState('')

    const [showMensagemErro, setShowMensagemErro] = useState(false)


    useEffect(() => {

        console.log('aluno -> ', alunoOld)

        if (alunoOld) {
            setNome(alunoOld.nome)
            setmatricula(alunoOld.matricula)
            setcurso(alunoOld.curso)
            setturno(alunoOld.turno)
        }

    }, [])


    function salvar() {

        if (nome === '' || matricula === '' || curso === '' || turno === '') {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const newaluno = {
                nome: nome,
                matricula: matricula,
                curso: curso,
                turno: turno
            }

            const objetoEmString = JSON.stringify(newaluno)
            console.log("🚀 ~ file: FormAlunoAsync.js:47 ~ salvar ~ objetoEmString:", objetoEmString)

            console.log(typeof (objetoEmString))

            const objeto = JSON.parse(objetoEmString)
            console.log("🚀 ~ file: FormAlunoAsync.js:52 ~ salvar ~ objeto:", objeto)

            console.log(typeof (objeto))


            if (alunoOld) {
                acao(alunoOld, newaluno)
            } else {
                acao(newaluno)
            }



            Toast.show({
                type: 'success',
                text1: 'aluno salva com sucesso!'
            })

            navigation.goBack()
        }

    }


    return (
        <View style={styles.container}>

            <Text variant='titleLarge' style={styles.title} >{alunoOld ? 'Editar aluno' : 'Adicionar aluno'}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Matrícula'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={matricula}
                    onChangeText={text => setmatricula(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Curso'}
                    mode='outlined'
                    value={curso}
                    onChangeText={text => setcurso(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                <TextInput
                    style={styles.input}
                    label={'Turno'}
                    mode='outlined'
                    value={turno}
                    onChangeText={text => setturno(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />

                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }


            </View>

            <View style={styles.buttonContainer}>

                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>

                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>


            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})