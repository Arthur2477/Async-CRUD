import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Card, Dialog, FAB, MD3Colors, Portal, Text } from 'react-native-paper'
import Toast from 'react-native-toast-message'


export default function ListaalunosAsyncStorage({ navigation, route }) {

  const [alunos, setalunos] = useState([])
  const [showModalExcluirUsuario, setShowModalExcluirUsuario] = useState(false)
  const [alunoASerExcluida, setalunoASerExcluida] = useState(null)


  useEffect(() => {
    loadalunos()
  }, [])

  async function loadalunos() {
    const response = await AsyncStorage.getItem('alunos')
    console.log("🚀 ~ file: ListaalunosAsyncStorage.js:21 ~ loadalunos ~ response:", response)
    const alunosStorage = response ? JSON.parse(response) : []
    setalunos(alunosStorage)
  }



  const showModal = () => setShowModalExcluirUsuario(true);

  const hideModal = () => setShowModalExcluirUsuario(false);

  async function adicionaraluno(aluno) {
    let novaListaalunos = alunos
    novaListaalunos.push(aluno)
    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaalunos));
    setalunos(novaListaalunos)
  }

  async function editaraluno(alunoAntiga, novosDados) {
    console.log('aluno ANTIGA -> ', alunoAntiga)
    console.log('DADOS NOVOS -> ', novosDados)

    const novaListaalunos = alunos.map(aluno => {
      if (aluno == alunoAntiga) {
        return novosDados
      } else {
        return aluno
      }
    })

    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaalunos))
    setalunos(novaListaalunos)

  }

  async function excluiraluno(aluno) {
    const novaListaalunos = alunos.filter(p => p !== aluno)
    await AsyncStorage.setItem('alunos', JSON.stringify(novaListaalunos))
    setalunos(novaListaalunos)
    Toast.show({
      type: 'success',
      text1: 'aluno excluida com sucesso!'
    })
  }

  function handleExluiraluno() {
    excluiraluno(alunoASerExcluida)
    setalunoASerExcluida(null)
    hideModal()
  }



  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >Lista de alunos</Text>

      <FlatList
        style={styles.list}
        data={alunos}
        renderItem={({ item }) => (
          <Card
            mode='outlined'
            style={styles.card}
          >
            <Card.Content
              style={styles.cardContent}
            >
              <View style={{ flex: 1 }}>
                <Text variant='titleMedium'>{item?.nome}</Text>
                <Text variant='bodyLarge'>Matrícula: {item?.matricula}</Text>
                <Text variant='bodyLarge'>Turno: {item?.turno}</Text>
                <Text variant='bodyLarge'>Curso: {item.curso}</Text>
              </View>
       


            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.push('FormalunoAsyncStorage', { acao: editaraluno, aluno: item })}>
                Editar
              </Button>
              <Button onPress={() => {
                setalunoASerExcluida(item)
                showModal()
              }}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
      />

      {/* Botão Flutuante */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.push('FormalunoAsyncStorage', { acao: adicionaraluno })}
      />


      {/* Modal Excluir Usuário */}
      <Portal>
        <Dialog visible={showModalExcluirUsuario} onDismiss={hideModal}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Tem certeza que deseja excluir este usuário?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideModal}>Voltar</Button>
            <Button onPress={handleExluiraluno}>Tenho Certeza</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  list: {
    width: '90%',
  },
  card: {
    marginTop: 15
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: MD3Colors.primary80,
    borderWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingBottom: 15
  }
})