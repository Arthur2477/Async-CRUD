
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import StackAlunoAsync from '../screens/alunosAsyncStorage/StackAlunoAsync'


const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Alunos'>

            <Drawer.Screen name="AlunosAsyncStorage" component={StackAlunoAsync} />

        </Drawer.Navigator>

    )
}